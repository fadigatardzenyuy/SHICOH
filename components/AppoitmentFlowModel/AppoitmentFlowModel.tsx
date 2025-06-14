// src/components/AppointmentFlow/AppointmentFlowModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { PaymentStep } from "./PaymentStep";
import { SuccessStep } from "./SuccessStep";
import { X } from "lucide-react";

import { Hospital } from "@/lib/utils/hospitalsUtils";
import { ConsultationDetailsStep } from "./ConsultationDetails";

interface AppointmentFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospital: Hospital | null;
}

type FlowStep = "payment" | "details" | "success";

export const AppointmentFlowModal = ({
  isOpen,
  onClose,
  hospital,
}: AppointmentFlowModalProps) => {
  const [step, setStep] = useState<FlowStep>("payment");

  useEffect(() => {
    // Reset to first step when modal is opened or hospital changes
    if (isOpen) {
      setStep("payment");
    }
  }, [isOpen]);

  if (!isOpen || !hospital) return null;

  const handlePaymentSuccess = () => setStep("details");

  const handleDetailsSubmit = (details: { type: "text"; content: string }) => {
    console.log("Submitting details to hospital email:", hospital.email);
    console.log("Details type:", details.type);
    console.log("Details content:", details.content);

    // In a real app, this would be an API call to a backend that sends an email
    // or stores the data and notifies the hospital.
    // The content is now always text (either typed or transcribed from voice)
    setStep("success");
  };

  const renderStep = () => {
    switch (step) {
      case "payment":
        return (
          <PaymentStep
            hospital={hospital}
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      case "details":
        return (
          <ConsultationDetailsStep
            hospital={hospital}
            onDetailsSubmit={handleDetailsSubmit}
          />
        );
      case "success":
        return <SuccessStep hospital={hospital} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-slate-900 rounded-2xl border border-gray-700/50 w-full max-w-md relative shadow-2xl shadow-emerald-500/10 animate-fadeInUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-700 p-1.5 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {renderStep()}
      </div>
    </div>
  );
};
