'use client'

import React, { useState, useEffect } from 'react'
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Lock,
  ArrowRight,
  Loader2,
  Receipt,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ALL_COMMERCIAL_PRODUCTS, calculateCommercialOrderSummary } from '@/packages/core/src/data/product-catalog'
import type { CommercialProduct, CommercialOrderSummary, LearnerEntitlement } from '@/packages/core/src/types'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any
  }
}

interface RazorpayCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string | null
  onSuccess?: (entitlement: LearnerEntitlement) => void
  initialEmail?: string
}

export function RazorpayCheckoutModal({
  isOpen,
  onClose,
  productId,
  onSuccess,
  initialEmail = '',
}: RazorpayCheckoutModalProps) {
  const [product, setProduct] = useState<CommercialProduct | null>(null)
  const [summary, setSummary] = useState<CommercialOrderSummary | null>(null)
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeEntitlement, setActiveEntitlement] = useState<LearnerEntitlement | null>(null)

  // Load product & initial summary
  useEffect(() => {
    if (!productId) {
      setProduct(null)
      setSummary(null)
      return
    }

    const p = ALL_COMMERCIAL_PRODUCTS[productId]
    if (p) {
      setProduct(p)
      try {
        const s = calculateCommercialOrderSummary(productId, appliedCoupon)
        setSummary(s)
      } catch (err) {
        console.error(err)
      }
    }
  }, [productId, appliedCoupon])

  // Load Razorpay Script dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  if (!isOpen || !product || !summary) return null

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return
    setAppliedCoupon(couponCode.trim())
    try {
      const s = calculateCommercialOrderSummary(product.id, couponCode.trim())
      setSummary(s)
      setError(null)
    } catch {
      setError('Invalid coupon code')
    }
  }

  const handleInitiatePayment = async () => {
    setLoading(true)
    setError(null)

    try {
      // 1. Create order on server
      const res = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          couponCode: appliedCoupon || undefined,
          customerEmail: email || undefined,
          customerPhone: phone || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize order')
      }

      const { orderNumber, razorpayOrderId, razorpayKeyId, isMock } = data

      // 2. If sandbox mock / dev mode without live keys:
      if (isMock || !window.Razorpay) {
        // Perform simulated sandbox checkout verification
        const mockPaymentId = `pay_mock_${Date.now()}`
        const mockSignature = `mock_sig_${orderNumber}_${mockPaymentId}`

        const verifyRes = await fetch('/api/checkout/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderNumber,
            razorpayOrderId,
            razorpayPaymentId: mockPaymentId,
            razorpaySignature: mockSignature,
            productId: product.id,
            customerEmail: email,
          }),
        })

        const verifyData = await verifyRes.json()
        if (!verifyRes.ok) {
          throw new Error(verifyData.error || 'Verification failed')
        }

        setIsSuccess(true)
        setActiveEntitlement(verifyData.entitlement)
        onSuccess?.(verifyData.entitlement)
        setLoading(false)
        return
      }

      // 3. Real Razorpay Standard Checkout
      const rzpOptions = {
        key: razorpayKeyId,
        amount: summary.totalPayablePaise,
        currency: 'INR',
        name: 'TalentXcel',
        description: product.title,
        order_id: razorpayOrderId,
        prefill: {
          email: email || '',
          contact: phone || '',
        },
        theme: {
          color: '#2563EB', // TalentXcel cobalt blue
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/checkout/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderNumber,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                productId: product.id,
                customerEmail: email,
              }),
            })

            const verifyData = await verifyRes.json()
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment signature verification failed')
            }

            setIsSuccess(true)
            setActiveEntitlement(verifyData.entitlement)
            onSuccess?.(verifyData.entitlement)
          } catch (vErr: unknown) {
            setError(vErr instanceof Error ? vErr.message : 'Payment verification failed')
          } finally {
            setLoading(false)
          }
        },
      }

      const rzp = new window.Razorpay(rzpOptions)
      rzp.on('payment.failed', (resp: { error?: { description?: string } }) => {
        setError(resp.error?.description || 'Payment was declined or failed.')
        setLoading(false)
      })
      rzp.open()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Payment initiation failed')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              TX
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {isSuccess ? 'Payment Successful' : 'Secure Checkout'}
              </h3>
              <p className="text-xs text-slate-500">
                {isSuccess ? 'Entitlement Activated' : 'Razorpay 256-Bit SSL Encrypted'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">Access Unlocked!</h4>
              <p className="text-sm text-slate-600 mt-1">
                Your payment of <span className="font-semibold text-slate-900">₹{summary.totalPayableRupees}</span> was verified.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl text-left space-y-2 text-xs text-emerald-950">
              <div className="flex justify-between">
                <span className="text-slate-600">Product:</span>
                <span className="font-medium text-slate-900">{product.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Domain:</span>
                <span className="font-medium text-slate-900 capitalize">{product.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Validity:</span>
                <span className="font-medium text-slate-900">{product.validityDays} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Attempts / Inclusions:</span>
                <span className="font-medium text-slate-900">
                  {product.attemptsAllowed === -1
                    ? 'Unlimited Attempts'
                    : `${product.attemptsAllowed ?? 1} Attempt(s)`}
                </span>
              </div>
            </div>

            <Button
              onClick={onClose}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm"
            >
              Start Learning Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          /* Checkout View */
          <div className="p-6 space-y-5">
            {/* Product Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {product.domain} Domain
                </span>
                {product.badge && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <h4 className="text-base font-bold text-slate-900">{product.title}</h4>
              <p className="text-xs text-slate-600">{product.tagline}</p>

              {/* Inclusions */}
              <ul className="pt-2 border-t border-slate-200/80 space-y-1 text-xs text-slate-600">
                {product.inclusions.slice(0, 3).map((inc, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learner Info */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email (for receipt & access credentials)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="learner@example.com"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone (optional, for SMS updates)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Coupon */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. FIRST10"
                    className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleApplyCoupon}
                    className="text-xs h-9 px-3"
                  >
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">
                    ✓ Coupon {appliedCoupon} applied (10% savings)!
                  </p>
                )}
              </div>
            </div>

            {/* Transparent GST & Price Breakdown */}
            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span className="font-medium">₹{summary.basePriceRupees}</span>
              </div>
              {summary.discountRupees > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promo Discount:</span>
                  <span>-₹{summary.discountRupees}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>GST (18% inclusive of 9% CGST + 9% SGST):</span>
                <span>₹{summary.gstAmountRupees}</span>
              </div>
              <div className="pt-2 border-t border-blue-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Payable:</span>
                <span className="text-blue-700">₹{summary.totalPayableRupees}</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Checkout Action Button */}
            <Button
              onClick={handleInitiatePayment}
              disabled={loading}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Contacting Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{summary.totalPayableRupees} via Razorpay</span>
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                PCI-DSS Level 1
              </span>
              <span>•</span>
              <span>UPI, Cards, NetBanking</span>
              <span>•</span>
              <span>7-Day Refund Policy</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
