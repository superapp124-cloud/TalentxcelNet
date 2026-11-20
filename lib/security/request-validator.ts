import { NextRequest, NextResponse } from 'next/server'

export const DEFAULT_MAX_PAYLOAD_BYTES = 512 * 1024 // 512 KB
export const ANALYTICS_MAX_PAYLOAD_BYTES = 64 * 1024 // 64 KB
export const ASSESSMENT_MAX_PAYLOAD_BYTES = 512 * 1024 // 512 KB
export const SKILLS_MAX_PAYLOAD_BYTES = 256 * 1024 // 256 KB

export type SafeJsonResult<T> =
  | { success: true; data: T }
  | { success: false; errorResponse: NextResponse }

/**
 * Safely parses a request body as JSON with enforced streaming byte limits.
 * Defense-in-depth mitigation against memory exhaustion (GHSA-mrhx-c7xc-m3w5).
 *
 * 1. Strictly validates Content-Length header as non-negative integer and rejects upfront (413).
 * 2. Streams req.body chunk-by-chunk; immediately cancels the stream reader upon exceeding maxBytes
 *    before buffering or decoding full payload into memory.
 * 3. Safely decodes and parses JSON with clean HTTP 400 for malformed input.
 */
export async function parseJsonWithLimit<T = unknown>(
  req: NextRequest,
  maxBytes: number = DEFAULT_MAX_PAYLOAD_BYTES
): Promise<SafeJsonResult<T>> {
  // 1. Strict Content-Length header verification
  const contentLengthHeader = req.headers.get('content-length')
  if (contentLengthHeader !== null) {
    const trimmed = contentLengthHeader.trim()
    // Strictly validate non-negative integer (reject floats, negative numbers, partial numeric strings)
    if (!/^\d+$/.test(trimmed)) {
      return {
        success: false,
        errorResponse: NextResponse.json(
          { error: 'Invalid Content-Length header' },
          { status: 400 }
        ),
      }
    }

    const declaredLength = Number(trimmed)
    if (declaredLength > maxBytes) {
      return {
        success: false,
        errorResponse: NextResponse.json(
          {
            error: 'Payload too large',
            message: `Declared payload size (${declaredLength} bytes) exceeds maximum allowed size of ${maxBytes} bytes`,
            maxBytes,
            declaredBytes: declaredLength,
          },
          { status: 413 }
        ),
      }
    }
  }

  // 2. Body presence check
  if (!req.body) {
    return {
      success: false,
      errorResponse: NextResponse.json(
        { error: 'Request body is empty' },
        { status: 400 }
      ),
    }
  }

  // 3. True streaming byte consumption with early stream cancellation
  const chunks: Uint8Array[] = []
  let totalBytes = 0

  if (typeof req.body.getReader === 'function') {
    const reader = req.body.getReader()
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        if (value) {
          totalBytes += value.byteLength
          if (totalBytes > maxBytes) {
            // Cancel stream immediately so socket buffers are dropped and no more chunks are read
            await reader.cancel('PAYLOAD_TOO_LARGE')
            return {
              success: false,
              errorResponse: NextResponse.json(
                {
                  error: 'Payload too large',
                  message: `Request stream exceeded maximum allowed size of ${maxBytes} bytes`,
                  maxBytes,
                },
                { status: 413 }
              ),
            }
          }
          chunks.push(value)
        }
      }
    } catch (streamErr) {
      return {
        success: false,
        errorResponse: NextResponse.json(
          { error: 'Failed to read request body stream' },
          { status: 400 }
        ),
      }
    } finally {
      reader.releaseLock()
    }
  } else {
    // Fallback for environments where body is not a Web ReadableStream
    try {
      const rawText = await req.text()
      const byteLen = Buffer.byteLength(rawText, 'utf-8')
      if (byteLen > maxBytes) {
        return {
          success: false,
          errorResponse: NextResponse.json(
            {
              error: 'Payload too large',
              message: `Request body exceeds maximum allowed size of ${maxBytes} bytes`,
              maxBytes,
            },
            { status: 413 }
          ),
        }
      }
      chunks.push(Buffer.from(rawText, 'utf-8'))
    } catch {
      return {
        success: false,
        errorResponse: NextResponse.json(
          { error: 'Failed to read request body' },
          { status: 400 }
        ),
      }
    }
  }

  // 4. Decode bounded buffer and parse JSON
  const rawText = Buffer.concat(chunks).toString('utf-8')
  if (!rawText.trim()) {
    return {
      success: false,
      errorResponse: NextResponse.json(
        { error: 'Request body is empty' },
        { status: 400 }
      ),
    }
  }

  try {
    const data = JSON.parse(rawText) as T
    return { success: true, data }
  } catch {
    return {
      success: false,
      errorResponse: NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      ),
    }
  }
}
