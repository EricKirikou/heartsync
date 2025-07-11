
import React from 'react';
import { Heart, X } from 'lucide-react';

interface SuperLikeModalProps {
  onClose: () => void;
  onSuperLike: () => void;
  superLikesCount: number;
}

const SuperLikeModal: React.FC<SuperLikeModalProps> = ({ onClose, onSuperLike, superLikesCount }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Super Like</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Heart size={28} className="text-white fill-current" />
          </div>
          <p className="text-gray-600 mb-2">
            Stand out from the crowd!
          </p>
          <p className="text-sm text-gray-500">
            Super Likes are 3x more likely to get a match. Your Super Like will be highlighted to them.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onSuperLike}
            disabled={superLikesCount === 0}
            className={`w-full py-3 rounded-2xl font-semibold transition-all ${
              superLikesCount > 0
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {superLikesCount > 0 ? `Send Super Like (${superLikesCount} left)` : 'No Super Likes Available'}
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Use Regular Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperLikeModal;
