import { NextRequest, NextResponse } from 'next/server'

export const DEFAULT_MAX_PAYLOAD_BYTES = 512 * 1024 // 512 KB
export const ANALYTICS_MAX_PAYLOAD_BYTES = 64 * 1024 // 64 KB
export const ASSESSMENT_MAX_PAYLOAD_BYTES = 512 * 1024 // 512 KB
export const SKILLS_MAX_PAYLOAD_BYTES = 256 * 1024 // 256 KB

export type SafeJsonResult<T> =
  | { success: true; data: T }
  | { success: false; errorResponse: NextResponse }

/**
 * Safely parses a request body as JSON with an enforced maximum byte size limit.
 * Defense-in-depth mitigation against payload-size and memory exhaustion attacks (GHSA-mrhx-c7xc-m3w5).
 * Rejects with 413 before unbounded buffering or expensive schema evaluation occurs.
 */
export async function parseJsonWithLimit<T = unknown>(
  req: NextRequest,
  maxBytes: number = DEFAULT_MAX_PAYLOAD_BYTES
): Promise<SafeJsonResult<T>> {
  const contentLengthHeader = req.headers.get('content-length')
  if (contentLengthHeader) {
    const declaredLength = parseInt(contentLengthHeader, 10)
    if (!isNaN(declaredLength) && declaredLength > maxBytes) {
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
  }

  let rawText: string
  try {
    rawText = await req.text()
  } catch (err) {
    return {
      success: false,
      errorResponse: NextResponse.json(
        { error: 'Failed to read request body' },
        { status: 400 }
      ),
    }
  }

  // Enforce byte length check on actual received content
  const actualByteLength = Buffer.byteLength(rawText, 'utf8')
  if (actualByteLength > maxBytes) {
    return {
      success: false,
      errorResponse: NextResponse.json(
        {
          error: 'Payload too large',
          message: `Request body exceeds maximum allowed size of ${maxBytes} bytes`,
          actualBytes: actualByteLength,
          maxBytes,
        },
        { status: 413 }
      ),
    }
  }

  try {
    const data = JSON.parse(rawText) as T
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      errorResponse: NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      ),
    }
  }
}
