import React from 'react';
import { Heart, RotateCcw, Zap, X, ChevronUp } from 'lucide-react';

interface DiscoverActionsProps {
  onRewind: () => void;
  onPass: () => void;
  onSuperLike: () => void;
  onLike: () => void;
  onBoost?: () => void;
  superLikesCount: number;
  boostsCount: number;
  dailyLikes: number;
  superLikeUsed: boolean;
  currentUserIndex: number;
  filteredUsersLength: number;
  showProfileInfo: boolean;
  toggleProfileInfo: () => void;
}

const DiscoverActions: React.FC<DiscoverActionsProps> = ({
  onRewind,
  onPass,
  onSuperLike,
  onLike,
  onBoost,
  superLikesCount,
  boostsCount,
  dailyLikes,
  superLikeUsed,
  currentUserIndex,
  filteredUsersLength,
  showProfileInfo,
  toggleProfileInfo
}) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40">
      <div className="flex flex-col items-center space-y-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-6 bg-transparent">
          {/* Rewind */}
          <button
            onClick={onRewind}
            className="p-3 rounded-full transition-all transform hover:scale-110 active:scale-95"
            title="Rewind"
          >
            <RotateCcw size={28} className="text-white drop-shadow-lg" />
          </button>

          {/* Pass */}
          <button
            onClick={onPass}
            className="p-4 rounded-full transition-all transform hover:scale-110 active:scale-95"
            title="Pass"
          >
            <X size={32} className="text-red-400 drop-shadow-lg" />
          </button>

          {/* Super Like */}
          <button
            onClick={onSuperLike}
            disabled={superLikesCount === 0 || superLikeUsed}
            className="p-3 rounded-full transition-all transform hover:scale-110 active:scale-95 relative"
            title={`Super Like (${superLikesCount} left)`}
          >
            <Heart 
              size={28} 
              className={`drop-shadow-lg ${
                superLikesCount > 0 && !superLikeUsed 
                  ? 'text-blue-300' 
                  : 'text-gray-400'
              }`} 
            />
            {superLikesCount > 0 && !superLikeUsed && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold border border-white">
                {superLikesCount}
              </div>
            )}
          </button>

          {/* Like */}
          <button
            onClick={onLike}
            disabled={dailyLikes >= 100}
            className="p-4 rounded-full transition-all transform hover:scale-110 active:scale-95 relative"
            title="Like"
          >
            <Heart 
              size={36} 
              className={`drop-shadow-lg ${
                dailyLikes < 100 
                  ? 'text-pink-400 fill-pink-400' 
                  : 'text-gray-400'
              }`} 
            />
            {dailyLikes < 100 && (
              <div className="absolute inset-0 rounded-full border-2 border-pink-400 animate-ping opacity-20"></div>
            )}
          </button>

          {/* Boost */}
          <button
            onClick={onBoost}
            disabled={boostsCount === 0}
            className="p-3 rounded-full transition-all transform hover:scale-110 active:scale-95 relative"
            title={`Boost (${boostsCount} left)`}
          >
            <Zap 
              size={28} 
              className={`drop-shadow-lg ${
                boostsCount > 0 
                  ? 'text-purple-300' 
                  : 'text-gray-400'
              }`} 
            />
            {boostsCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center font-bold border border-white">
                {boostsCount}
              </div>
            )}
          </button>
        </div>

        {/* Info Toggle Button */}
        <button
          onClick={toggleProfileInfo}
          className="p-2 rounded-full transition-all transform hover:scale-110 active:scale-95"
        >
          <ChevronUp 
            size={24} 
            className={`text-white drop-shadow-lg transition-transform duration-300 ${
              showProfileInfo ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Progress Dots */}
        <div className="flex space-x-2">
          {Array.from({ length: Math.min(5, filteredUsersLength - currentUserIndex) }).map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === 0 ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverActions;