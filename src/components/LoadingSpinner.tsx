'use client';

import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    fullScreen?: boolean;
    text?: string;
  }
  
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  
  export default function LoadingSpinner({
    size = 'md',
    color = 'blue-500',
    fullScreen = false,
    text = 'Loading...',
  }: LoadingSpinnerProps) {
    const spinnerContent = (
      <div className="flex flex-col items-center gap-4">
        <div 
          className={`${sizeMap[size]} rounded-full border-4 border-gray-200 animate-spin`}
          style={{ borderTopColor: `var(--${color})` }}
        />
        {text && <p className="text-gray-600 text-lg font-medium">{text}</p>}
      </div>
    );
  
    if (fullScreen) {
      return (
        <div className="fixed inset-0 bg-gray-50/80 backdrop-blur-sm flex items-center justify-center z-50">
          {spinnerContent}
        </div>
      );
    }
  
    return spinnerContent;
}