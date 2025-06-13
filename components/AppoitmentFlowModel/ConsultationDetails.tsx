"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Send,
  Square,
  Trash2,
  Type,
  FileText,
  Loader2,
  Languages,
} from "lucide-react";
import { Hospital } from "@/lib/utils/hospitalsUtils";

interface DetailsStepProps {
  hospital: Hospital;
  onDetailsSubmit: (details: { content: string }) => void;
}

// Define language options. Whisper is great at auto-detection,
// but providing a hint can help.
const languageOptions = [
  { value: "en", label: "English / Pidgin" },
  { value: "fr", label: "Français (French)" },
  // Add other languages here. 'null' relies on auto-detect.
  { value: null, label: "Other (Auto-Detect)" },
];

export const ConsultationDetailsStep = ({
  hospital,
  onDetailsSubmit,
}: DetailsStepProps) => {
  const [inputType, setInputType] = useState<"text" | "voice">("text");
  const [typedText, setTypedText] = useState("");
  const [voiceInputText, setVoiceInputText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(
    null
  );
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    setVoiceInputText("");
    setTranscriptionError(null);

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    if (selectedLanguage.value) {
      formData.append("language", selectedLanguage.value);
    }

    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setVoiceInputText(data.transcription);
    } catch (error: any) {
      console.error("Transcription failed:", error);
      setTranscriptionError(
        error.message || "Could not transcribe audio. Please try again."
      );
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleStartRecording = async () => {
    handleDeleteRecording();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        audioChunksRef.current = [];
        mediaRecorderRef.current.ondataavailable = (event) =>
          audioChunksRef.current.push(event.data);
        mediaRecorderRef.current.onstop = () => {
          const newAudioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          setAudioUrl(URL.createObjectURL(newAudioBlob));
          stream.getTracks().forEach((track) => track.stop());
          transcribeAudio(newAudioBlob);
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access error:", err);
        alert(
          "Microphone access was denied. Please allow access in your browser settings."
        );
      }
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleDeleteRecording = () => {
    setVoiceInputText("");
    setIsTranscribing(false);
    setTranscriptionError(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const content = inputType === "text" ? typedText : voiceInputText;
    setTimeout(() => {
      if (content) onDetailsSubmit({ content });
      setIsSubmitting(false);
    }, 1500);
  };

  const canSubmit =
    !isSubmitting &&
    ((inputType === "text" && typedText) ||
      (inputType === "voice" && voiceInputText && !isTranscribing));

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Consultation Details
      </h2>
      <p className="text-gray-400 mb-6 text-center">
        Type or record a message describing your symptoms for the medical team
        at {hospital.name}.
      </p>

      <div className="bg-gray-800/50 p-1 rounded-xl flex mb-6">
        <button
          onClick={() => setInputType("text")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            inputType === "text" ? "bg-emerald-600" : "hover:bg-gray-700"
          }`}
        >
          <Type className="w-4 h-4" /> Type Message
        </button>
        <button
          onClick={() => setInputType("voice")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            inputType === "voice" ? "bg-emerald-600" : "hover:bg-gray-700"
          }`}
        >
          <Mic className="w-4 h-4" /> Record Voice
        </button>
      </div>

      {inputType === "text" && (
        <textarea
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
          rows={8}
          placeholder="Describe your symptoms, medical history, or any concerns..."
          className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      )}

      {inputType === "voice" && (
        <div className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="language-select"
              className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300"
            >
              <Languages className="w-4 h-4" />
              Select Spoken Language
            </label>
            <select
              id="language-select"
              value={selectedLanguage.label}
              onChange={(e) => {
                const lang = languageOptions.find(
                  (opt) => opt.label === e.target.value
                );
                if (lang) setSelectedLanguage(lang);
              }}
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              {languageOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center min-h-[140px]">
            {!isRecording && !audioUrl && (
              <button
                onClick={handleStartRecording}
                className="flex flex-col items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center transition-colors">
                  <Mic className="w-8 h-8" />
                </div>
                <span>Tap to Record</span>
              </button>
            )}
            {isRecording && (
              <button
                onClick={handleStopRecording}
                className="flex flex-col items-center gap-2 text-red-400 animate-pulse"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Square className="w-8 h-8 fill-current text-red-500" />
                </div>
                <span>Recording... Tap to Stop</span>
              </button>
            )}
            {audioUrl && !isRecording && (
              <div className="w-full flex items-center justify-between gap-4">
                <audio src={audioUrl} controls className="flex-1" />
                <button
                  onClick={handleDeleteRecording}
                  className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>
              </div>
            )}
          </div>
          {(isTranscribing || voiceInputText || transcriptionError) && (
            <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Your Transcribed Message (edit if needed)
                </span>
              </div>
              {isTranscribing ? (
                <div className="flex items-center justify-center h-24 text-gray-400">
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  <span>Transcribing your voice...</span>
                </div>
              ) : transcriptionError ? (
                <div className="text-red-400 text-sm p-3 bg-red-500/10 rounded-lg">
                  {transcriptionError}
                </div>
              ) : (
                <textarea
                  value={voiceInputText}
                  onChange={(e) => setVoiceInputText(e.target.value)}
                  rows={6}
                  className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                />
              )}
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full mt-6 flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending Information...</span>
          </>
        ) : (
          <>
            <span>Send to Hospital</span>
            <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};
