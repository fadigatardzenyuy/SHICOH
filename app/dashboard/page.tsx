x

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserDigibook } from "@/lib/actions/book.action";

import { getRecommendedHospitals, Hospital } from "@/lib/utils/hospitalsUtils";

import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import DashboardError from "@/components/dashboard/DashboardErro";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserProfileCard from "@/components/dashboard/UserProfileCard";
import InfoCards from "@/components/dashboard/InfoCard";
import RecommendedHospitals from "@/components/dashboard/RecommendedHospitals";
import QuickActions from "@/components/dashboard/QuickAction";
import { getHospitalsData } from "@/data/hospital";

// Import hospital data and utilities

// Array of high-quality cover images for a random selection
const coverImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2138&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476703993599-0035a21b17a8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-6ab180507744?q=80&w=2070&auto=format&fit=crop",
];

export default function PatientDashboard() {
  const { user: clerkUser } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [hospitalsLoading, setHospitalsLoading] = useState(true);

interface SendModalState {
  isOpen: boolean; record: ConsultationRecord | null; patientEmail: string;
  emailBody: string; isSending: boolean;
}

  // Get recommended hospitals based on rating and distance
  const recommendedHospitals = useMemo(() => {
    if (hospitals.length === 0) return [];
    return getRecommendedHospitals(hospitals, 4.5, 4);
  }, [hospitals]);

  // Fetch hospital data
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setHospitalsLoading(true);
        const hospitalData = await getHospitalsData();
        setHospitals(hospitalData);
      } catch (error) {
        console.error("Failed to fetch hospitals:", error);
        // Fallback to static data
        setHospitals(hospitalsData);
      } finally {
        setHospitalsLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getUserDigibook();
        if (response.success) {
          if (response.data) {
            setUserData(response.data);
          } else {
            setError(
              "Welcome! Please create your health profile (Digibook) to view your dashboard."
            );
          }
        } else {
          setError(
            response.error || "Failed to load user data. Please try again."
          );
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("An unexpected error occurred. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <DashboardError error={error} />;
  }

  static async processConsultation(text: string): Promise<ProcessedConsultation> {
    return this.request<ProcessedConsultation>('/api/process-consultation', { method: 'POST', body: JSON.stringify({ text }) });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <DashboardHeader
            coverImage={coverImage}
            userName={userData.full_name?.split(" ")[0]}
          />

          <UserProfileCard userData={userData} clerkUser={clerkUser} />

          <InfoCards userData={userData} />

          {hospitalsLoading ? (
            <div className="mb-8 p-8 bg-gradient-to-br from-gray-800/60 to-slate-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                <span className="ml-3 text-gray-300">Loading hospitals...</span>
              </div>
            </div>
          ) : (
            <RecommendedHospitals
              hospitals={recommendedHospitals}
              allHospitals={hospitals}
            />
          )}

          <QuickActions />

        </div>
        <input ref={fileInputRef} type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={handleFileSelect} disabled={processingState.isProcessing}/>
        {showCamera && (<CameraCapture onCapture={processRecord} onClose={() => setShowCamera(false)} isProcessing={processingState.isProcessing}/>)}
        {showRecordModal && selectedRecord && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"><div className="bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"><div className="sticky top-0 bg-gray-800/80 backdrop-blur-md p-6 border-b border-gray-700 z-10"><div className="flex items-center justify-between"><h3 className="text-xl font-bold">Consultation Details</h3><button onClick={() => setShowRecordModal(false)} className="p-2 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button></div></div><div className="p-6">{selectedRecord.status !== 'completed' || !selectedRecord.formattedData ? (<div className="text-center py-12">{selectedRecord.status === 'processing' ? <><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div><p>AI is processing the document...</p></> : <><AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" /><h4 className="text-xl font-bold mb-2">Processing Failed</h4><p className="text-red-300 max-w-md mx-auto">{selectedRecord.errorMessage}</p></>}</div>) : (<div className="grid grid-cols-1 lg:grid-cols-5 gap-8"><div className="lg:col-span-2 space-y-4"><h4 className="font-semibold">Original Document</h4>{selectedRecord.imageUrl && <img src={selectedRecord.imageUrl} alt="Consultation document" className="w-full rounded-xl border border-gray-600"/>}</div><div className="lg:col-span-3 space-y-6"><div className="bg-gray-700/50 rounded-xl p-4 space-y-3"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><p className="text-sm text-gray-400">Patient Email</p><p className="font-medium truncate">{selectedRecord.formattedData.patientEmail || 'N/A'}</p></div><div><p className="text-sm text-gray-400">Doctor</p><p className="font-medium">{selectedRecord.formattedData.doctorName || 'N/A'}</p></div></div><div><p className="text-sm text-gray-400">Complaint</p><p className="font-medium">{selectedRecord.formattedData.complaint || 'N/A'}</p></div></div><div><h4 className="font-semibold mb-3">Consultation & Prescription</h4><div className="rounded-xl border border-gray-700 overflow-hidden"><table className="w-full text-sm text-left"><thead className="bg-gray-700/50"><tr className="text-xs text-gray-300 uppercase"><th scope="col" className="px-4 py-3">Lab Work / Drug</th><th scope="col" className="px-4 py-3">Lab Result / Advice</th><th scope="col" className="px-4 py-3 text-right">Fee (XAF)</th></tr></thead><tbody>{selectedRecord.formattedData.consultationItems.map((item, index) => (<tr key={index} className="bg-gray-800 border-b border-gray-700 last:border-b-0"><td className="px-4 py-3 font-medium align-top">{item.enrichedInfo ? item.enrichedInfo.correctedName : item.labWork}</td><td className="px-4 py-3 align-top text-gray-300">{item.labResults}{item.enrichedInfo && (<div className="space-y-2 mt-1"><p className="text-xs"><span className="font-semibold text-gray-400">Schedule: </span>{item.enrichedInfo.dosageSchedule}</p><p className="text-xs"><span className="font-semibold text-gray-400">Duration: </span>{item.enrichedInfo.duration}</p><div className="flex items-start gap-2 text-xs text-cyan-300 p-2 bg-cyan-500/10 rounded-md border border-cyan-500/20"><Info className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>{item.enrichedInfo.advice}</span></div></div>)}</td><td className="px-4 py-3 text-right font-mono align-top">{item.fee != null ? item.fee.toLocaleString() : 'Free'}</td></tr>))}<tr className="bg-gray-700/50 font-bold"><td colSpan={2} className="px-4 py-3 text-right">Total</td><td className="px-4 py-3 text-right font-mono">{selectedRecord.formattedData.consultationItems.reduce((acc, item) => acc + (item.fee || 0), 0).toLocaleString()}</td></tr></tbody></table></div></div><div><div className="flex justify-between items-center mb-3"><h4 className="font-semibold">Editable Consultation Summary</h4><button onClick={handlePolishSummary} disabled={isPolishing} className="flex items-center gap-2 px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 disabled:opacity-50 transition-all">{isPolishing ? <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div> : <Wand2 className="w-3 h-3" />}Polish with AI</button></div><textarea value={editableSummary} onChange={(e) => setEditableSummary(e.target.value)} rows={6} className="w-full p-4 bg-gray-900/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm text-gray-300 leading-relaxed"></textarea></div><div className="flex justify-end gap-4 pt-4 border-t border-gray-700"><button onClick={openSendModal} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg"><Send className="w-4 h-4" /> Review & Send</button></div></div></div>)}</div></div></div>
        )}
        {sendModalState.isOpen && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 animate-fade-in"><div className="bg-gray-800 rounded-2xl max-w-2xl w-full border border-gray-700"><div className="p-6 border-b border-gray-700"><h3 className="text-xl font-bold">Review and Send Consultation</h3></div><div className="p-6 space-y-4"><label className="block"><span className="text-sm font-medium text-gray-400">To:</span><input type="email" value={sendModalState.patientEmail} onChange={(e) => setSendModalState(p=>({...p, patientEmail: e.target.value}))} className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" disabled={sendModalState.isSending}/></label><label className="block"><span className="text-sm font-medium text-gray-400">Email Body:</span><textarea value={sendModalState.emailBody} onChange={(e) => setSendModalState(p => ({...p, emailBody: e.target.value}))} rows={12} className="mt-1 w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea></label></div><div className="flex justify-end gap-4 p-6 bg-gray-900/50 rounded-b-2xl"><button onClick={() => setSendModalState({ ...sendModalState, isOpen: false })} className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700" disabled={sendModalState.isSending}>Cancel</button><button onClick={handleSendEmail} className="flex items-center justify-center gap-2 w-36 px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-60" disabled={!sendModalState.patientEmail || sendModalState.isSending}>{sendModalState.isSending ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Sending...</> : <><Send className="w-4 h-4" /> Confirm & Send</>}</button></div></div></div>
        )}
    </div>
  );
}