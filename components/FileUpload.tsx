"use client"

import React, { useRef, ChangeEvent } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { FileUploadProps } from '@/types/api';

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dropzoneOptions: DropzoneOptions = {
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    disabled: isProcessing,
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  const triggerFileInput = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="text-6xl">📄</div>
          <div>
            <p className="text-lg font-medium">
              {isDragActive ? 'Drop the image here' : 'Drop an image here or click to select'}
            </p>
            <p className="text-sm text-gray-600">
              Supports JPG, PNG, GIF, BMP, WebP (Max 10MB)
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={triggerFileInput}
          disabled={isProcessing}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          📁 Choose File
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
};

export default FileUpload;