"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  ArrowLeft, 
  Zap,
  Star,
  Clock,
  Lock,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { getProductById, Product } from "@/lib/products";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const amount = searchParams.get("amount");
  const productName = searchParams.get("name");
  const method = searchParams.get("method");
  const { data: session } = useSession();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(method || "stripe");

  useEffect(() => {
    // If we have productId, get from products data, otherwise use URL params
    if (productId) {
      const foundProduct = getProductById(parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
      } else if (amount && productName) {
        // Create product from URL params if not found in products
        setProduct({
          id: parseInt(productId) || 0,
          name: productName,
          price: parseFloat(amount),
          description: 'Digital product purchase',
          category: 'digital',
          brand: 'Neo Market',
          image: '/placeholder.svg'
        });
      }
    } else if (amount && productName) {
      // Create product from URL params
      setProduct({
        id: 0,
        name: productName,
        price: parseFloat(amount),
        description: 'Digital product purchase',
        category: 'digital',
        brand: 'Neo Market',
        image: '/placeholder.svg'
      });
    }
  }, [productId, amount, productName]);

  const handleStripePayment = async () => {
    if (!session?.user) {
      toast.error("Please login to continue with payment");
      return;
    }

    setLoading(true);
    try {
      // Create payment intent using the API from Postman docs
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/purchases/payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken || 'your-auth-token'}`
        },
        body: JSON.stringify({
          productId: product?.id.toString() || "",
          amount: product?.price || 0,
          currency: 'usd'
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Redirect to Stripe checkout with the client secret
        const stripe = (window as unknown as { Stripe: (key: string) => { confirmPayment: (params: { clientSecret: string; confirmParams: { return_url: string } }) => Promise<{ error?: { message: string } }> } }).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
        const { error } = await stripe.confirmPayment({
          clientSecret: result.data.clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/payment/success`,
          },
        });

        if (error) {
          toast.error(error.message || "Payment failed");
        }
      } else {
        toast.error(result.message || "Failed to create payment intent");
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreditPayment = async () => {
    if (!session?.user) {
      toast.error("Please login to continue with payment");
      return;
    }

    setLoading(true);
    try {
      // Create purchase using credits according to Postman docs
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${backendUrl}/purchases/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken || 'your-auth-token'}`
        },
        body: JSON.stringify({
          productId: product?.id.toString() || "",
          amount: product?.price || 0
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(`Purchase successful! You earned ${result.data.creditsAwarded || 2} credits.`);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        toast.error(result.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error('Credit payment error:', error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we prepare your payment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/products" 
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Product Details */}
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">
                  {product.category === 'saas' ? '☁️' : product.category === 'book' ? '📚' : '💻'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${product.price}</div>
                <div className="text-sm text-gray-500">One-time</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-900">What{"'"}s included:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Instant access after payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Lifetime updates</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>

            {/* Credits Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-gray-900">Earn Credits</span>
              </div>
              <p className="text-sm text-gray-600">
                You{"'"}ll earn <span className="font-semibold text-indigo-600">2 credits</span> for this purchase, 
                which you can use for future purchases or redeem for exclusive rewards.
              </p>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-3 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="font-medium text-gray-900">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Secure payment with Stripe</div>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credits"
                    checked={paymentMethod === "credits"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-3 flex items-center gap-3">
                    <Star className="w-5 h-5 text-amber-500" />
                    <div>
                      <div className="font-medium text-gray-900">Pay with Credits</div>
                      <div className="text-sm text-gray-500">Use your earned credits</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${product.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Processing Fee</span>
                <span className="text-gray-900">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${product.price}</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={paymentMethod === "stripe" ? handleStripePayment : handleCreditPayment}
              disabled={loading || !session?.user}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : !session?.user ? (
                <div className="flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  Please Login to Continue
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {paymentMethod === "stripe" ? (
                    <>
                      <ExternalLink className="w-5 h-5" />
                      Pay with Stripe
                    </>
                  ) : (
                    <>
                      <Star className="w-5 h-5" />
                      Pay with Credits
                    </>
                  )}
                </div>
              )}
            </button>

            {/* Login Prompt */}
            {!session?.user && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">You need to be logged in to make a purchase</p>
                <Link 
                  href="/login" 
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  Login to your account →
                </Link>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Your payment is secure and encrypted</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
