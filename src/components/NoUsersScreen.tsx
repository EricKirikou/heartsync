
import React from 'react';
import { Heart } from 'lucide-react';

interface NoUsersScreenProps {
  onShowFilters: () => void;
  onStartOver: () => void;
}

const NoUsersScreen: React.FC<NoUsersScreenProps> = ({ onShowFilters, onStartOver }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mb-6">
        <Heart size={32} className="text-pink-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">No More Profiles!</h2>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        You've seen everyone in your area. Try expanding your filters or check back later for new matches!
      </p>
      <div className="space-y-3 w-full max-w-xs">
        <button
          onClick={onShowFilters}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all"
        >
          Adjust Filters
        </button>
        <button
          onClick={onStartOver}
          className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default NoUsersScreen;
