
import React from 'react';
import { Match } from '../types/user';

interface MessagesTabProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ matches, onSelectMatch }) => {
  const matchesWithMessages = matches.filter(match => match.lastMessage);

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Messages
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {matchesWithMessages.length} conversations
        </p>
      </div>

      {/* Messages list */}
      <div className="pb-20">
        {matchesWithMessages.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No messages yet
            </h2>
            <p className="text-gray-600">
              Start a conversation with your matches!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {matchesWithMessages.map((match) => (
              <button
                key={match.id}
                onClick={() => onSelectMatch(match)}
                className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="relative">
                  <img
                    src={match.user.photos[0]}
                    alt={match.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {match.lastMessage && !match.lastMessage.read && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {match.user.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {match.lastMessage?.timestamp}
                    </span>
                  </div>
                  {match.lastMessage && (
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {match.lastMessage.content}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesTab;
