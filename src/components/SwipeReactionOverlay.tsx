
import React from 'react';

interface SwipeReactionOverlayProps {
  recentSwipeReaction: string;
}

const SwipeReactionOverlay: React.FC<SwipeReactionOverlayProps> = ({ recentSwipeReaction }) => {
  if (!recentSwipeReaction) return null;

  return (
    <div className="absolute top-20 left-0 right-0 z-40 flex justify-center">
      <div className="bg-black/90 text-white px-4 py-2 rounded-xl text-sm font-bold animate-bounce shadow-lg">
        {recentSwipeReaction}
      </div>
    </div>
  );
};

export default SwipeReactionOverlay;
