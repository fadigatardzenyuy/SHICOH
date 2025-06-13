// This is the complete, self-contained, and final component file.
// It includes all features, fixes, and UI enhancements.

"use client"
import React, { useState, useRef, useEffect } from 'react';
import {
  Upload, Camera, FileText, User, Clock, CheckCircle, AlertCircle, X,
  Send, Heart, Stethoscope, Eye, Trash2, Wand2, Info, CheckCircle2
} from 'lucide-react';
import { processAndSaveConsultation } from '@/lib/actions/admin.action';
// import { processAndSaveConsultation } from './actions'; // Ensure this path is correct

// --- TYPES ---
interface ConsultationRecord {
  id: string;
  documentTitle: string;
  recordType: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'error';
  formattedData?: ProcessedConsultation;
  imageUrl?: string;
  errorMessage?: string;
}

interface ProcessedConsultation {
  patientEmail: string | null;
  patientPhoneNumber: string | null;
  doctorName: string | null;
  complaint: string | null;
  consultationItems: ConsultationItem[];
  summaryNotes: string;
}

interface ConsultationItem {
  labWork: string;
  labResults: string | null;
  drugs: string | null;
  fee: number | null;
  enrichedInfo?: {
    correctedName: string;
    dosageSchedule: string;
    duration: string;
    advice: string;
  } | null;
}

interface ProcessingState {
  isProcessing: boolean;
  error: string | null;
  progress: number;
  message: string;
}

interface SendModalState {
  isOpen: boolean;
  record: ConsultationRecord | null;
  patientEmail: string;
  emailBody: string;
  isSending: boolean;
}

// --- API CLIENT ---
class ApiClient {
  private static async request<TResponsePayload>(endpoint: string, options: RequestInit): Promise<TResponsePayload> {
    try {
      const response = await fetch(endpoint, { headers: { 'Content-Type': 'application/json', ...options.headers }, ...options });
      const responseText = await response.text();
      if (!response.ok) {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }
      return JSON.parse(responseText);
    } catch (error) { console.error('API Client Error:', error); throw error; }
  }

  static async processConsultation(imageData: string): Promise<ProcessedConsultation> {
    return this.request<ProcessedConsultation>('/api/process-consultation', { method: 'POST', body: JSON.stringify({ imageData }) });
  }

  static async polishSummary(text: string): Promise<{ polishedText: string }> {
    return this.request<{ polishedText: string }>('/api/polish-summary', { method: 'POST', body: JSON.stringify({ text }) });
  }
}

// --- UTILITY & CAMERA COMPONENTS ---
const convertFileToBase64 = (file: File): Promise<string> => { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onloadend = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Failed to convert file to base64.')); reader.onerror = () => reject(new Error('Failed to read file.')); reader.readAsDataURL(file); }); };
const validateImageFile = (file: File): { isValid: boolean; error?: string } => { const maxSize = 10 * 1024 * 1024; const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/pdf', 'image/webp']; if (!allowedTypes.includes(file.type)) { return { isValid: false, error: 'Invalid file type. Please upload an image or PDF file.' }; } if (file.size > maxSize) { return { isValid: false, error: 'File size too large. Please upload a file smaller than 10MB.' }; } return { isValid: true }; };
const CameraCapture = ({ onCapture, onClose, isProcessing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { startCamera(); return () => stopCamera(); }, []);
  const startCamera = async () => { try { setIsLoading(true); const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false }); streamRef.current = stream; if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); } setIsLoading(false); } catch (err) { setError('Camera access denied. Please check permissions.'); setIsLoading(false); } };
  const stopCamera = () => { if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); streamRef.current = null; } };
  const captureImage = () => { if (!videoRef.current || !canvasRef.current) return; const video = videoRef.current; const canvas = canvasRef.current; const ctx = canvas.getContext('2d'); if (ctx) { canvas.width = video.videoWidth; canvas.height = video.videoHeight; ctx.drawImage(video, 0, 0); const dataURL = canvas.toDataURL('image/jpeg', 0.8); const file = new File([dataURL], `consultation-${Date.now()}.jpg`, { type: 'image/jpeg' }); onCapture(file, dataURL); } };
  const handleClose = () => { stopCamera(); onClose(); };
  if (error) { return (<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"><div className="bg-gray-800 p-6 rounded-2xl max-w-sm mx-4 border border-gray-700"><h3 className="text-lg font-semibold mb-4 text-white">Camera Error</h3><p className="text-red-400 mb-4">{error}</p><button onClick={handleClose} className="w-full px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors">Close</button></div></div>); }
  return (<div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"><div className="relative w-full h-full max-w-4xl mx-4 bg-gray-900 rounded-2xl overflow-hidden border border-gray-700"><div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10"><button onClick={handleClose} className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"><X className="w-5 h-5" /></button><h3 className="text-white font-semibold text-lg">Capture Consultation Paper</h3><div className="w-11"></div></div><video ref={videoRef} className="w-full h-full object-cover" playsInline muted/>{isLoading && (<div className="absolute inset-0 bg-black/50 flex items-center justify-center"><div className="text-white text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto mb-2"></div><p>Initializing camera...</p></div></div>)}{<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2"><button onClick={captureImage} disabled={isProcessing || isLoading} className="w-16 h-16 bg-emerald-500 rounded-full border-4 border-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-2xl transition-colors">{isProcessing ? (<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>) : (<Camera className="w-6 h-6 text-white" />)}</button></div>}<div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center"><p className="text-white text-sm bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">Position the document in the frame</p></div><canvas ref={canvasRef} style={{ display: 'none' }} /></div></div>);
};

// --- MAIN DASHBOARD COMPONENT ---
export default function DoctorAdminDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [processingState, setProcessingState] = useState<ProcessingState>({ isProcessing: false, error: null, progress: 0, message: '' });
  const [showCamera, setShowCamera] = useState(false);
  const [records, setRecords] = useState<ConsultationRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<ConsultationRecord | null>(null);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [sendModalState, setSendModalState] = useState<SendModalState>({ isOpen: false, record: null, patientEmail: '', emailBody: '', isSending: false });
  const [editableSummary, setEditableSummary] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setIsVisible(true); }, []);
  useEffect(() => { if (showRecordModal && selectedRecord?.formattedData?.summaryNotes) { setEditableSummary(selectedRecord.formattedData.summaryNotes); } else { setEditableSummary(''); } }, [showRecordModal, selectedRecord]);

  const processRecord = async (file: File, imageUrl: string | null = null) => {
    const validation = validateImageFile(file);
    if (!validation.isValid) { setProcessingState({ isProcessing: false, error: validation.error, progress: 0, message: '' }); return; }
    setProcessingState({ isProcessing: true, error: null, progress: 10, message: 'Uploading document...' });
    const recordId = `REC-${Date.now()}`;
    try {
      const base64 = imageUrl || await convertFileToBase64(file);
      const newRecord: ConsultationRecord = { id: recordId, documentTitle: "Processing...", recordType: file.type, uploadDate: new Date().toLocaleString(), status: 'processing', imageUrl: base64 };
      setRecords(prev => [newRecord, ...prev]);

      setProcessingState(prev => ({ ...prev, progress: 50, message: 'AI is processing the document...' }));
      const formattedData = await ApiClient.processConsultation(base64);
      
      setRecords(prev => prev.map(r => r.id === recordId ? { ...r, status: 'completed', documentTitle: `Consultation by ${formattedData.doctorName || 'Unknown'}`, formattedData } : r));
      setProcessingState({ isProcessing: false, error: null, progress: 100, message: '' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown AI error occurred.";
      setProcessingState({ isProcessing: false, error: errorMessage, progress: 0, message: '' });
      setRecords(prev => prev.map(r => r.id === recordId ? { ...r, status: 'error', documentTitle: 'Processing Failed', errorMessage: errorMessage } : r));
    }
  };

  const handlePolishSummary = async () => {
    if (!editableSummary) return;
    setIsPolishing(true);
    try {
      const { polishedText } = await ApiClient.polishSummary(editableSummary);
      setEditableSummary(polishedText);
    } catch (error) { console.error("Failed to polish summary:", error); }
    finally { setIsPolishing(false); }
  };

  const openSendModal = () => {
    if (!selectedRecord || !selectedRecord.formattedData) return;
    const { doctorName, consultationItems } = selectedRecord.formattedData;
    const totalFee = consultationItems.reduce((acc, item) => acc + (item.fee || 0), 0);
    let emailBody = `Dear Patient,\n\nPlease find the summary of your recent consultation with ${doctorName || 'our clinic'}.\n\n--- Consultation Summary ---\n${editableSummary}\n\n--- Prescriptions & Advice ---\n`;
    consultationItems.forEach(item => { if (item.enrichedInfo) { emailBody += `* ${item.enrichedInfo.correctedName}: ${item.enrichedInfo.advice}\n`; } });
    emailBody += `\n--- Billing Details ---\n`;
    consultationItems.forEach(item => { if (item.fee != null && item.fee > 0) { emailBody += `- ${item.labWork}: ${item.fee.toLocaleString()} XAF\n`; } });
    emailBody += `\nTotal Amount Due: ${totalFee.toLocaleString()} XAF\n\nIf you have any questions, please do not hesitate to contact us.\n\nThank you,\n${doctorName || 'The Clinic'}`;
    setSendModalState({ isOpen: true, record: selectedRecord, patientEmail: selectedRecord.formattedData.patientEmail || '', emailBody: emailBody, isSending: false });
  };

  const handleSendEmail = async () => {
    if (!sendModalState.record || !sendModalState.patientEmail) return;
    setSendModalState(prev => ({ ...prev, isSending: true }));
    const payload = {
      doctor_name: sendModalState.record.formattedData?.doctorName || null,
      patient_email: sendModalState.patientEmail,
      patient_phone_number: sendModalState.record.formattedData?.patientPhoneNumber || null,
      complaint: sendModalState.record.formattedData?.complaint || null,
      consultation_items: sendModalState.record.formattedData?.consultationItems || [],
      summary_notes: editableSummary,
      total_fee: sendModalState.record.formattedData?.consultationItems.reduce((acc, item) => acc + (item.fee || 0), 0) || 0,
      image_url: sendModalState.record.imageUrl || null,
    };
    try {
      const result = await processAndSaveConsultation(payload);
      if (!result.success) throw new Error(result.error);
      setSendModalState({ isOpen: false, record: null, patientEmail: '', emailBody: '', isSending: false });
      setShowRecordModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      console.error("Failed to save or send consultation:", errorMessage);
      setProcessingState(prev => ({...prev, isProcessing: false, error: errorMessage}));
      setSendModalState(prev => ({ ...prev, isSending: false }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) { processRecord(file); } if (e.target) { e.target.value = ''; } };
  const viewRecord = (record: ConsultationRecord) => { setSelectedRecord(record); setShowRecordModal(true); };
  const deleteRecord = (id: string) => setRecords(prev => prev.filter(r => r.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div><div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div><Stethoscope className="absolute top-20 left-10 w-4 h-4 text-emerald-400/20 animate-bounce" /><Heart className="absolute bottom-40 left-8 w-4 h-4 text-teal-400/20 animate-bounce delay-1000" /></div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16">
            <div className="max-w-6xl mx-auto">
                <div className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}><div className="flex items-center justify-between mb-6"><div><div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm mb-4"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div><span className="text-emerald-400 font-medium text-sm">AI-Powered Health Dashboard</span></div><h1 className="text-3xl sm:text-4xl font-bold mb-2">Consultation<span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">Processor</span></h1><p className="text-gray-300 text-lg">Upload patient consultation papers for automated processing.</p></div><div className="hidden sm:flex items-center gap-4"><div className="text-right"><p className="text-sm text-gray-400">Dr. Sarah Johnson</p><p className="text-xs text-emerald-400">Cardiology Dept.</p></div><div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-white" /></div></div></div></div>
                <div className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}><div className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl"><h2 className="text-2xl font-bold mb-6 text-center">Upload Consultation Paper</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"><button onClick={() => fileInputRef.current?.click()} disabled={processingState.isProcessing} className="group relative flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-gray-700/50 to-slate-700/50 rounded-2xl border-2 border-dashed border-gray-600 hover:border-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"><div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"><Upload className="w-8 h-8 text-white" /></div><div className="text-center"><h3 className="text-lg font-semibold mb-2">Upload File</h3><p className="text-gray-400 text-sm">Select image or PDF</p></div></button><button onClick={() => setShowCamera(true)} disabled={processingState.isProcessing} className="group relative flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-gray-700/50 to-slate-700/50 rounded-2xl border-2 border-dashed border-gray-600 hover:border-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"><div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"><Camera className="w-8 h-8 text-white" /></div><div className="text-center"><h3 className="text-lg font-semibold mb-2">Take Photo</h3><p className="text-gray-400 text-sm">Use device camera</p></div></button></div>{processingState.isProcessing && (<div className="bg-gradient-to-r from-gray-700/50 to-slate-700/50 rounded-2xl p-6 border border-gray-600/50"><div className="flex items-center gap-4 mb-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div><div><h3 className="font-semibold">{processingState.message}</h3><p className="text-gray-400 text-sm">AI is working its magic...</p></div></div><div className="w-full bg-gray-700 rounded-full h-2"><div className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300" style={{ width: `${processingState.progress}%` }}></div></div><p className="text-right text-sm text-gray-400 mt-2">{processingState.progress}%</p></div>)}{processingState.error && (<div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3"><AlertCircle className="w-5 h-5 text-red-400" /><p className="text-red-400">{processingState.error}</p><button onClick={() => setProcessingState(p => ({ ...p, error: null }))} className="ml-auto text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button></div>)}</div></div>
                {records.length > 0 && (<div className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}><h2 className="text-2xl font-bold mb-6">Recent Consultations</h2><div className="grid gap-4">{records.map((record) => (<div key={record.id} className="bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300"><div className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0"><FileText className="w-6 h-6 text-white" /></div><div><h3 className="font-semibold text-lg">{record.documentTitle}</h3><p className="text-gray-400 text-sm">{record.recordType}</p><div className="flex items-center gap-2 text-xs text-gray-500 mt-1"><Clock className="w-3 h-3" />{record.uploadDate}</div></div></div><div className="flex items-center gap-3"><div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${record.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : record.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>{record.status === 'completed' ? <CheckCircle className="w-3 h-3" /> : record.status === 'error' ? <AlertCircle className="w-3 h-3" /> : <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-400"></div>}{record.status}</div><div className="flex gap-2"><button onClick={() => viewRecord(record)} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors" title="View Details"><Eye className="w-4 h-4" /></button><button onClick={() => deleteRecord(record.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button></div></div></div></div>))}</div></div>)}
            </div>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={handleFileSelect} disabled={processingState.isProcessing}/>
        {showCamera && (<CameraCapture onCapture={processRecord} onClose={() => setShowCamera(false)} isProcessing={processingState.isProcessing}/>)}
        {showRecordModal && selectedRecord && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"><div className="bg-gray-800 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"><div className="sticky top-0 bg-gray-800/80 backdrop-blur-md p-6 border-b border-gray-700 z-10"><div className="flex items-center justify-between"><h3 className="text-xl font-bold">Consultation Details</h3><button onClick={() => setShowRecordModal(false)} className="p-2 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button></div></div><div className="p-6">{selectedRecord.status !== 'completed' || !selectedRecord.formattedData ? (<div className="text-center py-12">{selectedRecord.status === 'processing' ? <><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div><p>AI is processing the document...</p></> : <><AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" /><h4 className="text-xl font-bold mb-2">Processing Failed</h4><p className="text-red-300 max-w-md mx-auto">{selectedRecord.errorMessage}</p></>}</div>) : (<div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><div className="space-y-6"><h4 className="font-semibold">Original Document</h4>{selectedRecord.imageUrl && <img src={selectedRecord.imageUrl} alt="Consultation document" className="w-full rounded-xl border border-gray-600"/>}<div><h4 className="font-semibold">AI-Polished Transcript</h4><div className="prose prose-sm prose-invert mt-2 p-4 bg-gray-900/50 rounded-lg border border-gray-700 max-w-none max-h-96 overflow-y-auto" dangerouslySetInnerHTML={{ __html: selectedRecord.polishedText?.replace(/\n/g, '<br />') || 'No polished text available.' }}/></div></div><div className="space-y-6"><div className="bg-gray-700/50 rounded-xl p-4 space-y-3"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><p className="text-sm text-gray-400">Patient Email</p><p className="font-medium truncate">{selectedRecord.formattedData.patientEmail || 'N/A'}</p></div><div><p className="text-sm text-gray-400">Doctor</p><p className="font-medium">{selectedRecord.formattedData.doctorName || 'N/A'}</p></div></div><div><p className="text-sm text-gray-400">Complaint</p><p className="font-medium">{selectedRecord.formattedData.complaint || 'N/A'}</p></div></div><div><h4 className="font-semibold mb-3">Consultation & Prescription</h4><div className="rounded-xl border border-gray-700 overflow-hidden"><table className="w-full text-sm text-left"><thead className="bg-gray-700/50"><tr className="text-xs text-gray-300 uppercase"><th scope="col" className="px-4 py-3">Lab Work / Drug</th><th scope="col" className="px-4 py-3">Lab Result / Advice</th><th scope="col" className="px-4 py-3 text-right">Fee (XAF)</th></tr></thead><tbody>{selectedRecord.formattedData.consultationItems.map((item, index) => (<tr key={index} className="bg-gray-800 border-b border-gray-700 last:border-b-0"><td className="px-4 py-3 font-medium align-top">{item.enrichedInfo ? item.enrichedInfo.correctedName : item.labWork}</td><td className="px-4 py-3 align-top text-gray-300">{item.labResults}{item.enrichedInfo && (<div className="space-y-2 mt-1"><p className="text-xs"><span className="font-semibold text-gray-400">Schedule: </span>{item.enrichedInfo.dosageSchedule}</p><p className="text-xs"><span className="font-semibold text-gray-400">Duration: </span>{item.enrichedInfo.duration}</p><div className="flex items-start gap-2 text-xs text-cyan-300 p-2 bg-cyan-500/10 rounded-md border border-cyan-500/20"><Info className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>{item.enrichedInfo.advice}</span></div></div>)}</td><td className="px-4 py-3 text-right font-mono align-top">{item.fee != null ? item.fee.toLocaleString() : 'Free'}</td></tr>))}<tr className="bg-gray-700/50 font-bold"><td colSpan={2} className="px-4 py-3 text-right">Total</td><td className="px-4 py-3 text-right font-mono">{selectedRecord.formattedData.consultationItems.reduce((acc, item) => acc + (item.fee || 0), 0).toLocaleString()}</td></tr></tbody></table></div></div><div><div className="flex justify-between items-center mb-3"><h4 className="font-semibold">Editable Consultation Summary</h4><button onClick={handlePolishSummary} disabled={isPolishing} className="flex items-center gap-2 px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 disabled:opacity-50 transition-all">{isPolishing ? <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div> : <Wand2 className="w-3 h-3" />}Polish with AI</button></div><textarea value={editableSummary} onChange={(e) => setEditableSummary(e.target.value)} rows={6} className="w-full p-4 bg-gray-900/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm text-gray-300 leading-relaxed"></textarea></div><div className="flex justify-end gap-4 pt-4 border-t border-gray-700"><button onClick={openSendModal} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg"><Send className="w-4 h-4" /> Review & Send</button></div></div></div>)}</div></div></div>
        )}
        {sendModalState.isOpen && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 animate-fade-in"><div className="bg-gray-800 rounded-2xl max-w-2xl w-full border border-gray-700"><div className="p-6 border-b border-gray-700"><h3 className="text-xl font-bold">Review and Send Consultation</h3></div><div className="p-6 space-y-4"><label className="block"><span className="text-sm font-medium text-gray-400">To:</span><input type="email" value={sendModalState.patientEmail} onChange={(e) => setSendModalState(p=>({...p, patientEmail: e.target.value}))} className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" disabled={sendModalState.isSending}/></label><label className="block"><span className="text-sm font-medium text-gray-400">Email Body:</span><textarea value={sendModalState.emailBody} onChange={(e) => setSendModalState(p => ({...p, emailBody: e.target.value}))} rows={12} className="mt-1 w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea></label></div><div className="flex justify-end gap-4 p-6 bg-gray-900/50 rounded-b-2xl"><button onClick={() => setSendModalState({ ...sendModalState, isOpen: false })} className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700" disabled={sendModalState.isSending}>Cancel</button><button onClick={handleSendEmail} className="flex items-center justify-center gap-2 w-36 px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-60" disabled={!sendModalState.patientEmail || sendModalState.isSending}>{sendModalState.isSending ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Sending...</> : <><Send className="w-4 h-4" /> Confirm & Send</>}</button></div></div></div>
        )}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] p-4 animate-fade-in"><div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-md w-full border border-emerald-500/30 p-8 text-center shadow-2xl"><div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div><h3 className="text-2xl font-bold mb-3">Success!</h3><p className="text-gray-300 mb-6">The consultation has been saved. The patient will receive their information via Email and WhatsApp shortly.</p><button onClick={() => setShowSuccessModal(false)} className="w-full px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">Close</button></div></div>
        )}
    </div>
  );
}