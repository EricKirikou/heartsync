
import React from 'react';
import { User } from '../types/user';
import { X, MapPin, Briefcase, GraduationCap, Star, Heart } from 'lucide-react';

interface ProfileViewModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onLike: () => void;
  onPass: () => void;
}

const ProfileViewModal: React.FC<ProfileViewModalProps> = ({ 
  user, 
  isOpen, 
  onClose, 
  onLike, 
  onPass 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-md h-5/6 overflow-hidden animate-slide-up">
        {/* Header with close button */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <X size={20} />
          </button>
          
          {/* Profile Image */}
          <div className="h-80 relative">
            <img
              src={user.photos[0]}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Verified badge */}
            {user.verified && (
              <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                <Star size={12} className="fill-current" />
                <span>Verified</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pb-24 overflow-y-auto max-h-full">
          {/* Basic Info */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {user.name}, {user.age}
              </h1>
              <div className="text-sm text-gray-500">
                {user.lastActive}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-600 text-sm mb-4">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{user.location}</span>
                {user.distance && <span>• {user.distance} km away</span>}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>

          {/* Additional Details */}
          <div className="space-y-4 mb-6">
            {user.job && (
              <div className="flex items-center space-x-3">
                <div className="bg-pink-100 p-2 rounded-full">
                  <Briefcase size={16} className="text-pink-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Work</div>
                  <div className="text-gray-600 text-sm">{user.job}</div>
                </div>
              </div>
            )}

            {user.education && (
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <GraduationCap size={16} className="text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Education</div>
                  <div className="text-gray-600 text-sm">{user.education}</div>
                </div>
              </div>
            )}

            {user.height && (
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600 text-sm font-medium">📏</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Height</div>
                  <div className="text-gray-600 text-sm">{user.height}</div>
                </div>
              </div>
            )}

            {user.pronouns && (
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <span className="text-green-600 text-sm font-medium">👤</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Pronouns</div>
                  <div className="text-gray-600 text-sm">{user.pronouns}</div>
                </div>
              </div>
            )}
          </div>

          {/* Interests */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <span
                  key={interest}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    index % 3 === 0 ? 'bg-pink-100 text-pink-700' :
                    index % 3 === 1 ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }`}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* More Photos */}
          {user.photos.length > 1 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">More Photos</h2>
              <div className="grid grid-cols-2 gap-3">
                {user.photos.slice(1).map((photo, index) => (
                  <div key={index} className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={photo}
                      alt={`${user.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={onPass}
              className="w-14 h-14 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              title="Pass"
            >
              <span className="text-2xl">✕</span>
            </button>

            <button
              onClick={onLike}
              className="w-16 h-16 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
              title="Like"
            >
              <Heart size={28} className="text-green-600 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewModal;
