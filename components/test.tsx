# Type-Safe Google Gemini for Text Extraction in Next.js

## Overview
This guide provides a fully type-safe implementation using TypeScript for Google's Gemini models to analyze images and extract text from documents.

## Step 1: Get Google AI Studio API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 2: Install Dependencies

```bash
npm install @google/generative-ai react-dropzone
npm install -D typescript @types/react @types/node
```

## Step 3: Environment Setup

Create `.env.local` in your project root:

```env
GOOGLE_AI_API_KEY=your_api_key_here
```

## Step 4: Create Type Definitions

Create `types/api.ts`:

```typescript
export interface ExtractTextRequest {
  imageData: string;
}

export interface ExtractTextResponse {
  text: string;
}

export interface ApiError {
  error: string;
}

export interface ProcessingState {
  isProcessing: boolean;
  error: string | null;
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export interface CameraProps {
  onCapture: (file: File) => void;
  isProcessing: boolean;
  onClose: () => void;
}

export interface CameraState {
  isOpen: boolean;
  isSupported: boolean;
  error: string | null;
}

export interface ImagePreviewProps {
  src: string;
  alt: string;
}

export interface ExtractedTextProps {
  text: string;
  onCopy: () => void;
}
```

## Step 5: Create API Route

### App Router (`app/api/extract-text/route.ts`)
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { ExtractTextRequest, ExtractTextResponse, ApiError } from '@/types/api';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(request: NextRequest): Promise<NextResponse<ExtractTextResponse | ApiError>> {
  try {
    const body: ExtractTextRequest = await request.json();
    const { imageData } = body;

    if (!imageData) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    // Validate and clean base64 data
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
    
    if (!base64Data) {
      return NextResponse.json(
        { error: 'Invalid image data format' },
        { status: 400 }
      );
    }

    // Determine MIME type from original data URL
    const mimeTypeMatch = imageData.match(/^data:(image\/[a-z]+);base64,/);
    const mimeType = mimeTypeMatch?.[1] || 'image/jpeg';

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `Extract all text from this image. Please return only the extracted text, maintaining the original structure and formatting as much as possible. If no text is found, return "No text detected in the image."`;
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
        }
      }
    ]);

    const response = await result.response;
    const extractedText = response.text();
    
    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('Error extracting text:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to extract text';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
```

### Pages Router (`pages/api/extract-text.ts`)
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextApiRequest, NextApiResponse } from 'next';
import { ExtractTextRequest, ExtractTextResponse, ApiError } from '@/types/api';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExtractTextResponse | ApiError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageData }: ExtractTextRequest = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'Image data is required' });
    }
    
    // Validate and clean base64 data
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
    
    if (!base64Data) {
      return res.status(400).json({ error: 'Invalid image data format' });
    }

    // Determine MIME type from original data URL
    const mimeTypeMatch = imageData.match(/^data:(image\/[a-z]+);base64,/);
    const mimeType = mimeTypeMatch?.[1] || 'image/jpeg';

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `Extract all text from this image. Please return only the extracted text, maintaining the original structure and formatting as much as possible. If no text is found, return "No text detected in the image."`;
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
        }
      }
    ]);

    const response = await result.response;
    const extractedText = response.text();
    
    res.status(200).json({ text: extractedText });
  } catch (error) {
    console.error('Error extracting text:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to extract text';
    
    res.status(500).json({ error: errorMessage });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
```

## Step 6: Create Utility Functions

Create `utils/imageProcessing.ts`:

```typescript
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const dataURLToFile = (dataURL: string, filename: string): File => {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const checkCameraSupport = (): boolean => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

export const getCameraConstraints = (facingMode: 'user' | 'environment' = 'environment'): MediaStreamConstraints => {
  return {
    video: {
      facingMode: facingMode,
      width: { ideal: 1920 },
      height: { ideal: 1080 }
    },
    audio: false
  };
};

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Please upload an image file (JPEG, PNG, GIF, BMP, WebP).'
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size too large. Please upload an image smaller than 10MB.'
    };
  }

  return { isValid: true };
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};
```

## Step 7: Create API Client

Create `lib/api.ts`:

```typescript
import { ExtractTextRequest, ExtractTextResponse, ApiError } from '@/types/api';

export class ApiClient {
  private static async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  }

  static async extractText(imageData: string): Promise<string> {
    const request: ExtractTextRequest = { imageData };
    
    const response = await this.request<ExtractTextResponse>('/api/extract-text', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    return response.text;
  }
}
```

## Step 8: Create Component Hooks

Create `hooks/useDocumentScanner.ts`:

```typescript
import { useState, useCallback } from 'react';
import { ProcessingState, CameraState } from '@/types/api';
import { ApiClient } from '@/lib/api';
import { convertFileToBase64, validateImageFile, copyToClipboard, checkCameraSupport } from '@/utils/imageProcessing';

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
```

## Step 9: Create Typed Components

Create `components/Camera.tsx`:

```typescript
import React, { useRef, useEffect, useState } from 'react';
import { CameraProps } from '@/types/api';
import { getCameraConstraints, dataURLToFile } from '@/utils/imageProcessing';

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
```

```typescript
import React from 'react';
import { ImagePreviewProps } from '@/types/api';

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Original Image</h3>
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  );
};

export default ImagePreview;
```

Create `components/ExtractedText.tsx`:

```typescript
import React from 'react';
import { ExtractedTextProps } from '@/types/api';

const ExtractedText: React.FC<ExtractedTextProps> = ({ text, onCopy }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Extracted Text</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap text-sm">{text}</pre>
      </div>
      <button
        onClick={onCopy}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        type="button"
      >
        Copy Text
      </button>
    </div>
  );
};

export default ExtractedText;
```

Create `components/FileUpload.tsx`:

```typescript
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
```

## Step 10: Main Document Scanner Component

Create `components/DocumentScanner.tsx`:

```typescript
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
```

## Step 11: Use the Component

In your page (`app/page.tsx`):

```typescript
import DocumentScanner from '@/components/DocumentScanner';

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-100">
      <DocumentScanner />
    </div>
  );
}
```

## Step 12: TypeScript Configuration

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Key Type Safety Features

1. **Strict Type Definitions**: All interfaces and types are properly defined
2. **API Response Types**: Typed request/response objects for API calls
3. **Error Handling**: Proper error type checking and handling
4. **React Component Props**: All components have typed props
5. **Hooks**: Custom hooks with proper return type definitions
6. **File Validation**: Type-safe file validation with detailed error messages
7. **Async Operations**: Properly typed Promise returns
8. **Event Handlers**: Type-safe event handling

## Benefits of Type Safety

- **Compile-time Error Detection**: Catch errors before runtime
- **Better IDE Support**: Autocomplete, refactoring, and navigation
- **Documentation**: Types serve as inline documentation
- **Refactoring Safety**: Changes are validated across the codebase
- **Team Collaboration**: Clear contracts between different parts of the application

This implementation provides full type safety while maintaining all the functionality of the original code.