
import React from 'react';
import { Match } from '../types/user';

interface MatchesTabProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

const MatchesTab: React.FC<MatchesTabProps> = ({ matches, onSelectMatch }) => {
  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Your Matches
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {matches.length} {matches.length === 1 ? 'match' : 'matches'}
        </p>
      </div>

      {/* Matches grid */}
      <div className="p-4 pb-20">
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💕</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No matches yet
            </h2>
            <p className="text-gray-600">
              Keep swiping to find your perfect match!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {matches.map((match) => (
              <button
                key={match.id}
                onClick={() => onSelectMatch(match)}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={match.user.photos[0]}
                  alt={match.user.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-semibold text-sm">
                    {match.user.name}
                  </h3>
                  {match.lastMessage ? (
                    <p className="text-white/80 text-xs mt-1 truncate">
                      {match.lastMessage.content}
                    </p>
                  ) : (
                    <p className="text-white/80 text-xs mt-1">
                      Say hello! 👋
                    </p>
                  )}
                </div>
                {match.lastMessage && !match.lastMessage.read && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-pink-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesTab;
