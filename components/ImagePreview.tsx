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
