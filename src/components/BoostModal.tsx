
import React from 'react';
import { Zap, X } from 'lucide-react';

interface BoostModalProps {
  onClose: () => void;
  onBoost: () => void;
  boostsCount: number;
}

const BoostModal: React.FC<BoostModalProps> = ({ onClose, onBoost, boostsCount }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Boost Your Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Zap size={28} className="text-white" />
          </div>
          <p className="text-gray-600 mb-2">
            Be seen by more people for 30 minutes!
          </p>
          <p className="text-sm text-gray-500">
            Your profile will be one of the top profiles shown in your area.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onBoost}
            disabled={boostsCount === 0}
            className={`w-full py-3 rounded-2xl font-semibold transition-all ${
              boostsCount > 0
                ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {boostsCount > 0 ? `Use Boost (${boostsCount} left)` : 'No Boosts Available'}
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostModal;
