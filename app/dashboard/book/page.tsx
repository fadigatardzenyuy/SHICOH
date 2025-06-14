"use client";

import React, { useState, useEffect, FC } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowLeft,
  BookHeart,
  User,
  Heart,
  Shield,
  Activity,
  Calendar,
  Phone,
  MapPin,
  Stethoscope,
  FileText,
  Pencil,
  Droplet,
  Users,
  Hospital,
  CreditCard,
  Edit3,
  Save,
  AlertCircle,
  Clock,
  Star,
  X,
  Download,
} from "lucide-react";

import {
  getUserDigibook,
  updateDigibookField,
} from "@/lib/actions/book.action";

// Simple Editable Field Component
interface EditableFieldProps {
  label: string;
  value: any;
  fieldName: string;
  onSave: (field: string, value: any) => Promise<any>;
  icon: React.ElementType;
  inputType?: "text" | "date" | "textarea" | "json";
  jsonSubFields?: { key: string; label: string }[];
}

const EditableField: FC<EditableFieldProps> = ({
  label,
  value,
  fieldName,
  onSave,
  icon: Icon,
  inputType = "text",
  jsonSubFields,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(fieldName, currentValue);
    setIsSaving(false);
    setIsEditing(false);
  };

  const displayValue = () => {
    if (inputType === "json" && value) {
      return (
        jsonSubFields
          ?.map((f) => `${f.label}: ${value[f.key] || "Not specified"}`)
          .join(", ") || "Not specified"
      );
    }
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value || "Not specified";
  };

  return (
    <div className="group relative print:break-inside-avoid">
      {!isEditing ? (
        <div className="flex items-start gap-3 py-3 hover:bg-gray-50 rounded-lg px-3 transition-all duration-200 print:hover:bg-transparent">
          <Icon className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">
              {label}
            </div>
            <div className="text-gray-900 text-sm leading-relaxed font-medium">
              {displayValue()}
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-200 transition-all duration-200 print:hidden"
          >
            <Edit3 className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 border-2 border-emerald-200 shadow-sm print:hidden">
          <div className="flex items-center gap-2 mb-3">
            <Icon className="w-4 h-4 text-emerald-600" />
            <span className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
              {label}
            </span>
          </div>

          {inputType === "json" && jsonSubFields ? (
            <div className="space-y-3">
              {jsonSubFields.map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-gray-600 font-medium block mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={currentValue?.[field.key] || ""}
                    onChange={(e) =>
                      setCurrentValue({
                        ...currentValue,
                        [field.key]: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 text-sm"
                  />
                </div>
              ))}
            </div>
          ) : inputType === "textarea" ? (
            <textarea
              value={currentValue || ""}
              onChange={(e) => setCurrentValue(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 text-sm resize-none"
            />
          ) : (
            <input
              type={inputType}
              value={currentValue || ""}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-900 text-sm"
            />
          )}

          <div className="flex justify-end items-center gap-2 mt-3">
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 text-sm"
            >
              {isSaving ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-3 h-3" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Chapter Section Component
const ChapterSection: FC<{
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  chapterNumber: string;
}> = ({ title, icon: Icon, children, chapterNumber }) => (
  <div className="mb-8 print:break-inside-avoid">
    {/* Chapter Header */}
    <div className="flex items-center gap-4 mb-6 pb-3 border-b-2 border-emerald-200">
      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
          Chapter {chapterNumber}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
    </div>

    {/* Chapter Content */}
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="space-y-4">{children}</div>
    </div>
  </div>
);

// Main Digibook Page Component
export default function DigibookPage() {
  const { user: clerkUser } = useUser();
  const [digibookData, setDigibookData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getUserDigibook();
      if (response.success && response.data) {
        setDigibookData(response.data);
      } else {
        setError(response.error || "Could not load your Digibook.");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSaveField = async (field: string, value: any) => {
    setSaveStatus(null);
    const result = await updateDigibookField({ field, value });
    if (result.success) {
      setDigibookData((prev: any) => ({ ...prev, [field]: value }));
      setSaveStatus({ message: "Saved successfully!", type: "success" });
    } else {
      setSaveStatus({
        message: result.error || "Failed to save.",
        type: "error",
      });
    }
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">
            Loading your medical book...
          </p>
        </div>
      </div>
    );
  }

  if (error || !digibookData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg font-medium">
            {error || "Medical book not found."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const {
    full_name,
    date_of_birth,
    gender,
    phone_number,
    home_address,
    emergency_contact,
    blood_type,
    allergies_text,
    existing_conditions,
    medical_history,
    current_medications_text,
    primary_doctor,
    insurance_provider,
    insurance_policy_number,
    updated_at,
  } = digibookData;

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Save Status */}
      {saveStatus && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg shadow-lg print:hidden ${
            saveStatus.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {saveStatus.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-8 print:px-0 print:py-0">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Dashboard
          </Link>

          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        {/* Book Cover */}
        <div className="bg-white rounded-lg p-8 mb-8 border-2 border-gray-200 shadow-lg print:shadow-none print:border-gray-400">
          <div className="text-center">
            {/* Medical Cross Symbol */}
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              DIGITAL MEDICAL BOOK
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto mb-4 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {full_name}
            </h2>

            {/* Patient Info Summary */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm text-gray-600 mb-6">
              <div>
                <span className="font-medium">Date of Birth:</span>
                <div>{date_of_birth || "Not specified"}</div>
              </div>
              <div>
                <span className="font-medium">Blood Type:</span>
                <div className="text-red-600 font-semibold">
                  {blood_type || "Not specified"}
                </div>
              </div>
            </div>

            {/* Document Info */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last updated: {new Date(updated_at).toLocaleDateString()}
              </div>
              <div>•</div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                SHICo Platform
              </div>
            </div>
          </div>
        </div>

        {/* Book Content - Chapters */}
        <div className="space-y-8">
          {/* Chapter 1: Personal Information */}
          <ChapterSection
            title="Personal Information"
            icon={User}
            chapterNumber="1"
          >
            <EditableField
              label="Full Name"
              value={full_name}
              fieldName="full_name"
              onSave={handleSaveField}
              icon={User}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Date of Birth"
                value={date_of_birth}
                fieldName="date_of_birth"
                onSave={handleSaveField}
                icon={Calendar}
                inputType="date"
              />
              <EditableField
                label="Gender"
                value={gender}
                fieldName="gender"
                onSave={handleSaveField}
                icon={Users}
              />
            </div>
            <EditableField
              label="Phone Number"
              value={phone_number}
              fieldName="phone_number"
              onSave={handleSaveField}
              icon={Phone}
            />
            <EditableField
              label="Home Address"
              value={home_address}
              fieldName="home_address"
              onSave={handleSaveField}
              icon={MapPin}
              inputType="textarea"
            />
          </ChapterSection>

          {/* Chapter 2: Emergency Information */}
          <ChapterSection
            title="Emergency Contact"
            icon={Heart}
            chapterNumber="2"
          >
            <EditableField
              label="Emergency Contact"
              value={emergency_contact}
              fieldName="emergency_contact"
              onSave={handleSaveField}
              icon={Phone}
              inputType="json"
              jsonSubFields={[
                { key: "name", label: "Name" },
                { key: "phone", label: "Phone" },
                { key: "relationship", label: "Relationship" },
              ]}
            />
            <EditableField
              label="Blood Type"
              value={blood_type}
              fieldName="blood_type"
              onSave={handleSaveField}
              icon={Droplet}
            />
          </ChapterSection>

          {/* Chapter 3: Medical Information */}
          <ChapterSection
            title="Medical Information"
            icon={Stethoscope}
            chapterNumber="3"
          >
            <EditableField
              label="Allergies"
              value={allergies_text}
              fieldName="allergies_text"
              onSave={handleSaveField}
              icon={AlertCircle}
              inputType="textarea"
            />
            <EditableField
              label="Existing Conditions"
              value={existing_conditions}
              fieldName="existing_conditions"
              onSave={handleSaveField}
              icon={Activity}
              inputType="textarea"
            />
            <EditableField
              label="Current Medications"
              value={current_medications_text}
              fieldName="current_medications_text"
              onSave={handleSaveField}
              icon={Stethoscope}
              inputType="textarea"
            />
            <EditableField
              label="Medical History"
              value={medical_history}
              fieldName="medical_history"
              onSave={handleSaveField}
              icon={FileText}
              inputType="json"
              jsonSubFields={[
                { key: "past_visits", label: "Past Visits" },
                { key: "surgeries", label: "Surgeries" },
                { key: "family_history", label: "Family History" },
              ]}
            />
          </ChapterSection>

          {/* Chapter 4: Insurance Information */}
          <ChapterSection
            title="Insurance Information"
            icon={Shield}
            chapterNumber="4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Insurance Provider"
                value={insurance_provider}
                fieldName="insurance_provider"
                onSave={handleSaveField}
                icon={Hospital}
              />
              <EditableField
                label="Policy Number"
                value={insurance_policy_number}
                fieldName="insurance_policy_number"
                onSave={handleSaveField}
                icon={CreditCard}
              />
            </div>
          </ChapterSection>
        </div>

        {/* Book Footer */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-gray-800">
              SHICo Health Platform
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            "Digital healthcare solutions for modern Cameroon"
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              HIPAA Compliant
            </div>
            <div>•</div>
            <div>Encrypted & Secure</div>
            <div>•</div>
            <div>© 2024 SHICo</div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          .print\\:break-inside-avoid {
            break-inside: avoid !important;
          }

          .print\\:bg-white {
            background-color: white !important;
          }

          .print\\:shadow-none {
            box-shadow: none !important;
          }

          .print\\:border-gray-400 {
            border-color: #9ca3af !important;
          }

          .print\\:px-0 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .print\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          .print\\:hover\\:bg-transparent:hover {
            background-color: transparent !important;
          }
        }
      `}</style>
    </div>
  );
}
