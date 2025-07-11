
import React from 'react';
import { Heart } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="relative">
        <Heart size={48} className="text-pink-500 animate-pulse" />
        <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-25"></div>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mt-4 mb-2">Finding Your Matches</h2>
      <p className="text-sm text-gray-600">Discovering amazing people near you...</p>
      <div className="mt-4 flex space-x-1">
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
