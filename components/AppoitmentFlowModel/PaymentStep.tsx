// src/components/AppointmentFlow/PaymentStep.tsx
"use client";
import React, { useState } from "react";
import { CreditCard, Smartphone, ArrowRight, CheckCircle } from "lucide-react";
import { Hospital } from "@/lib/utils/hospitalsUtils";

interface PaymentStepProps {
  hospital: Hospital;
  onPaymentSuccess: () => void;
}

type PaymentMethod = "mobile_money" | "orange_money";

export const PaymentStep = ({
  hospital,
  onPaymentSuccess,
}: PaymentStepProps) => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("mobile_money");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const consultationFee = 5000; // 5000 CFA

  const handlePayment = async () => {
    if (!phoneNumber) {
      alert("Please enter your phone number");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      // Auto-proceed to next step after showing success
      setTimeout(() => {
        onPaymentSuccess();
      }, 2000);
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="p-6 sm:p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-green-400">
          Payment Successful!
        </h2>
        <p className="text-gray-400 mb-4">
          Your payment of {consultationFee.toLocaleString()} CFA has been
          processed successfully.
        </p>
        <div className="animate-spin w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-2 text-center">Payment</h2>
      <p className="text-gray-400 mb-6 text-center">
        Consultation fee for {hospital.name}
      </p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-400">
            {consultationFee.toLocaleString()} CFA
          </div>
          <div className="text-sm text-gray-400">Consultation Fee</div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="text-sm font-medium text-gray-300 mb-3">
          Select Payment Method
        </div>

        <button
          onClick={() => setSelectedMethod("mobile_money")}
          className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
            selectedMethod === "mobile_money"
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedMethod === "mobile_money"
                  ? "bg-emerald-500"
                  : "bg-gray-600"
              }`}
            >
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">Mobile Money</div>
              <div className="text-sm text-gray-400">MTN, ORANGE Money</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedMethod("orange_money")}
          className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
            selectedMethod === "orange_money"
              ? "border-orange-500 bg-orange-500/10"
              : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                selectedMethod === "orange_money"
                  ? "bg-orange-500"
                  : "bg-gray-600"
              }`}
            >
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">Orange Money</div>
              <div className="text-sm text-gray-400">
                Direct Orange Money payment
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing || !phoneNumber}
        className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <span>Pay {consultationFee.toLocaleString()} CFA</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <div className="mt-4 text-center text-xs text-gray-500">
        Secure payment processed by{" "}
        {selectedMethod === "mobile_money" ? "Mobile Money" : "Orange Money"}
      </div>
    </div>
  );
};
