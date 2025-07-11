
import React from 'react';

interface SwipeIndicatorsProps {
  isDragging: boolean;
  dragOffset: { x: number; y: number };
}

const SwipeIndicators: React.FC<SwipeIndicatorsProps> = ({ isDragging, dragOffset }) => {
  if (!isDragging) return null;

  return (
    <>
      <div className={`absolute top-1/2 left-8 transform -translate-y-1/2 transition-opacity duration-200 ${
        dragOffset.x < -50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg border-4 border-red-400 rotate-12">
          NOPE
        </div>
      </div>
      <div className={`absolute top-1/2 right-8 transform -translate-y-1/2 transition-opacity duration-200 ${
        dragOffset.x > 50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg border-4 border-green-400 -rotate-12">
          LIKE
        </div>
      </div>
    </>
  );
};

export default SwipeIndicators;
