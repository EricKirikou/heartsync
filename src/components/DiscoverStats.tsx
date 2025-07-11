import React from 'react';
import { Sliders } from 'lucide-react';

interface DiscoverStatsProps {
  dailyLikes: number;
  superLikesRemaining: number;
  boostsRemaining: number;
  onShowFilters: () => void;
}

const DiscoverStats: React.FC<DiscoverStatsProps> = ({ 
  dailyLikes, 
  superLikesRemaining, 
  boostsRemaining,
  onShowFilters 
}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4 text-xs">
        <div className="text-gray-600">
          <span className="font-bold text-pink-500">{dailyLikes}</span> daily likes
        </div>
        <div className="text-gray-600">
          <span className="font-bold text-blue-500">{superLikesRemaining}</span> super likes
        </div>
        <div className="text-gray-600">
          <span className="font-bold text-purple-500">{boostsRemaining}</span> boosts
        </div>
      </div>
      <button 
        onClick={onShowFilters}
        className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
      >
        <Sliders size={16} className="text-white" />
      </button>
    </div>
  );
};

export default DiscoverStats;