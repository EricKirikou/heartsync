
import React from 'react';
import { Heart, X } from 'lucide-react';

interface ActionButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSwipeLeft, onSwipeRight }) => {
  return (
    <div className="flex justify-center items-center space-x-8 mt-4">
      <button
        onClick={onSwipeLeft}
        className="w-16 h-16 bg-white border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
      >
        <X size={28} className="text-red-500" />
      </button>
      
      <button
        onClick={onSwipeRight}
        className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-110 active:scale-95 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
        <Heart size={32} className="text-white fill-current relative z-10" />
      </button>
    </div>
  );
};

export default ActionButtons;
