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