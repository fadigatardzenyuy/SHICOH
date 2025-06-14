
"use client"
import React from 'react';
import { useDocumentScanner } from '@/hooks/useDocumentScanner';
import FileUpload from './FileUpload';
import ImagePreview from './ImagePreview';
import ExtractedText from './ExtractedText';
import Camera from './Camera';

const DocumentScanner: React.FC = () => {
  const {
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
  } = useDocumentScanner();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Document Text Extractor</h1>
        {(previewImage || extractedText) && (
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            type="button"
          >
            Reset
          </button>
        )}
      </div>

      <FileUpload 
        onFileSelect={processImage} 
        isProcessing={processingState.isProcessing} 
      />

      {/* Camera Button */}
      <div className="mb-8 text-center">
        <button
          onClick={openCamera}
          disabled={processingState.isProcessing || !cameraState.isSupported}
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          📸 Open Camera
        </button>
        {!cameraState.isSupported && (
          <p className="text-sm text-gray-500 mt-2">
            Camera not supported on this device
          </p>
        )}
      </div>

      {/* Camera Modal */}
      {cameraState.isOpen && (
        <Camera
          onCapture={handleCameraCapture}
          isProcessing={processingState.isProcessing}
          onClose={closeCamera}
        />
      )}

      {/* Error Display */}
      {(processingState.error || cameraState.error) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-red-700">
              {processingState.error || cameraState.error}
            </p>
            <button
              onClick={clearError}
              className="text-red-700 hover:text-red-900"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Processing Status */}
      {processingState.isProcessing && (
        <div className="text-center mb-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Extracting text...</p>
        </div>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {previewImage && (
          <ImagePreview src={previewImage} alt="Document preview" />
        )}

        {extractedText && (
          <ExtractedText text={extractedText} onCopy={handleCopyText} />
        )}
      </div>
    </div>
  );
};

export default DocumentScanner;