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
