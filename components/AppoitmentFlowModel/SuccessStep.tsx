// src/components/AppointmentFlow/SuccessStep.tsx
import React from 'react';
import { Hospital } from '@/data/hospital';
import { CheckCircle, PartyPopper } from 'lucide-react';

interface SuccessStepProps {
    hospital: Hospital;
    onClose: () => void;
}

export const SuccessStep = ({ hospital, onClose }: SuccessStepProps) => {
    return (
        <div className="text-center p-6 sm:p-8">
            <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Appointment Confirmed!</h2>
            <p className="text-gray-400 mb-6">
                Your consultation details have been sent to{' '}
                <span className="font-semibold text-emerald-400">{hospital.name}</span>.
                They will review your information and contact you shortly.
            </p>
            <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
                <PartyPopper className="w-5 h-5" />
                <span>All Done!</span>
            </button>
        </div>
    );
}