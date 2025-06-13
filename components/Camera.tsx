

"use client"
import React, { useRef, useEffect, useState } from 'react';
import { CameraProps } from '@/types/api';
import { dataURLToFile, getCameraConstraints } from '@/lib/imageProcessing';
// import { getCameraConstraints, dataURLToFile } from '@/utils/imageProcessing';

const Camera: React.FC<CameraProps> = ({ onCapture, isProcessing, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Stop existing stream
      if (streamRef.current) {
        stopCamera();
      }

      const constraints = getCameraConstraints(facingMode);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Failed to access camera. Please check permissions.');
      setIsLoading(false);
    }
  };

  const stopCamera = (): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const captureImage = (): void => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const dataURL = canvas.toDataURL('image/jpeg', 0.8);
    
    // Convert to File object
    const file = dataURLToFile(dataURL, `camera-capture-${Date.now()}.jpg`);
    
    onCapture(file);
  };

  const switchCamera = (): void => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const handleClose = (): void => {
    stopCamera();
    onClose();
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
          <h3 className="text-lg font-semibold mb-4">Camera Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleClose}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-4xl max-h-4xl mx-4 bg-black rounded-lg overflow-hidden">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button
            onClick={handleClose}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
            type="button"
          >
            ✕
          </button>
          <h3 className="text-white font-semibold">Camera</h3>
          <button
            onClick={switchCamera}
            className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
            type="button"
            title="Switch Camera"
          >
            🔄
          </button>
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p>Loading camera...</p>
            </div>
          </div>
        )}

        {/* Capture button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={captureImage}
            disabled={isProcessing || isLoading}
            className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            type="button"
          >
            {isProcessing ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
            ) : (
              <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded">
            Position document in frame and tap to capture
          </p>
        </div>

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default Camera;