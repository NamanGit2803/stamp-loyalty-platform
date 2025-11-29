"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: 199,
    description: "Perfect for small shops",
    features: [
      "Up to 500 customers",
      "Basic loyalty rewards",
      "WhatsApp notifications",
      "Email support",
      "Basic analytics",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 499,
    description: "For growing businesses",
    features: [
      "Up to 5,000 customers",
      "Advanced loyalty features",
      "WhatsApp + SMS notifications",
      "Priority support",
      "Advanced analytics",
      "Multiple branches",
      "Custom rewards",
    ],
    popular: true,
  },
  {
    name: "Unlimited",
    price: 999,
    description: "For large enterprises",
    features: [
      "Unlimited customers",
      "All Pro features",
      "API access",
      "24/7 dedicated support",
      "Custom integrations",
      "Advanced reporting",
      "Custom branding",
    ],
    popular: false,
  },
]

export default function PlansSection() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that fits your business</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl border-blue-100 ${
                plan.popular ? "md:scale-105 shadow-lg border-2 border-blue-600" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-600 text-white py-2 text-center text-sm font-semibold">Most Popular</div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-blue-900">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>

                <Button
                  className={`w-full mb-8 ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "border-blue-200 text-blue-600 hover:bg-blue-50 bg-white"}`}
                  asChild
                >
                  <Link href="/payment">Choose Plan</Link>
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <span className="text-blue-600 flex-shrink-0 mt-1">✓</span>
                      <span className="text-blue-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">All plans include a 14-day free trial</p>
          <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent" asChild>
            <Link href="/dashboard">Skip for now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
