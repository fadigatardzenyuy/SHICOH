"use client"

import { useState, useCallback } from 'react';
import { ProcessingState, CameraState } from '@/types/api';
import { ApiClient } from '@/lib/api';
import { checkCameraSupport, convertFileToBase64, copyToClipboard, validateImageFile } from '@/lib/imageProcessing';
// import { convertFileToBase64, validateImageFile, copyToClipboard, checkCameraSupport } from '@/utils/imageProcessing';

export const useDocumentScanner = () => {
  const [extractedText, setExtractedText] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    error: null,
  });
  const [cameraState, setCameraState] = useState<CameraState>({
    isOpen: false,
    isSupported: checkCameraSupport(),
    error: null,
  });

  const processImage = useCallback(async (file: File): Promise<void> => {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setProcessingState({
        isProcessing: false,
        error: validation.error || 'Invalid file',
      });
      return;
    }

    setProcessingState({ isProcessing: true, error: null });
    
    try {
      // Convert file to base64
      const base64 = await convertFileToBase64(file);
      setPreviewImage(base64);

      // Extract text using API
      const text = await ApiClient.extractText(base64);
      setExtractedText(text);
      
      setProcessingState({ isProcessing: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process image';
      setProcessingState({
        isProcessing: false,
        error: errorMessage,
      });
      console.error('Error processing image:', error);
    }
  }, []);

  const openCamera = useCallback((): void => {
    if (!cameraState.isSupported) {
      setCameraState(prev => ({
        ...prev,
        error: 'Camera is not supported on this device',
      }));
      return;
    }
    setCameraState(prev => ({ ...prev, isOpen: true, error: null }));
  }, [cameraState.isSupported]);

  const closeCamera = useCallback((): void => {
    setCameraState(prev => ({ ...prev, isOpen: false, error: null }));
  }, []);

  const handleCameraCapture = useCallback(async (file: File): Promise<void> => {
    closeCamera();
    await processImage(file);
  }, [closeCamera, processImage]);

  const handleCopyText = useCallback(async (): Promise<void> => {
    if (!extractedText) return;
    
    const success = await copyToClipboard(extractedText);
    if (!success) {
      setProcessingState(prev => ({
        ...prev,
        error: 'Failed to copy text to clipboard',
      }));
    }
  }, [extractedText]);

  const clearError = useCallback((): void => {
    setProcessingState(prev => ({ ...prev, error: null }));
    setCameraState(prev => ({ ...prev, error: null }));
  }, []);

  const reset = useCallback((): void => {
    setExtractedText('');
    setPreviewImage(null);
    setProcessingState({ isProcessing: false, error: null });
    setCameraState(prev => ({ ...prev, isOpen: false, error: null }));
  }, []);

  return {
    extractedText,
    previewImage,
    processingState,
    cameraState,
    processImage,
    openCamera,
    closeCamera,
    handleCameraCapture,
    handleCopyText,
    clearError,
    reset,
  };
};