
import React, { useState } from 'react';
import { User, EditableProfile } from '../types/user';
import EditProfileModal from './EditProfileModal';
import { Edit3, Settings, Shield, Bell, Heart, Star, MapPin, Briefcase, GraduationCap } from 'lucide-react';

interface ProfileTabProps {
  user: User;
  onUpdateProfile: (profile: EditableProfile) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, onUpdateProfile }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSaveProfile = (profile: EditableProfile) => {
    onUpdateProfile(profile);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-pink-50 via-white to-purple-50 pb-20">
      {/* Header */}
      <div className="relative">
        <img
          src={user.photos[0]}
          alt={user.name}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {user.name}, {user.age}
                </h1>
                {user.verified && (
                  <div className="bg-blue-500 p-1 rounded-full">
                    <Star size={16} className="text-white fill-current" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-white/90 text-sm">
                {user.job && (
                  <div className="flex items-center space-x-1">
                    <Briefcase size={14} />
                    <span>{user.job}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{user.location}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <Edit3 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-pink-600">47</div>
            <div className="text-xs text-gray-600">Likes</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-xs text-gray-600">Matches</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-xs text-gray-600">Chats</div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Heart size={18} className="text-pink-500" />
            <span>About Me</span>
          </h2>
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          
          {/* Additional Info */}
          <div className="mt-4 space-y-2">
            {user.education && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <GraduationCap size={16} />
                <span>{user.education}</span>
              </div>
            )}
            {user.height && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-4 h-4 text-center">📏</span>
                <span>{user.height}</span>
              </div>
            )}
            {user.pronouns && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-4 h-4 text-center">👤</span>
                <span>{user.pronouns}</span>
              </div>
            )}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <span
                key={interest}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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

        {/* Photos */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Photos</h2>
          <div className="grid grid-cols-2 gap-4">
            {user.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                <img
                  src={photo}
                  alt={`${user.name} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Edit3 size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center hover:border-pink-300 transition-colors cursor-pointer group">
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📷</div>
                <span className="text-xs text-gray-500 font-medium">Add Photo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Settings size={18} className="text-gray-600" />
            <span>Settings</span>
          </h2>
          
          <div className="space-y-2">
            <button 
              onClick={() => setShowEditModal(true)}
              className="w-full p-4 bg-white rounded-2xl text-left hover:bg-gray-50 transition-colors duration-200 shadow-sm border border-gray-100 flex items-center space-x-3"
            >
              <Edit3 size={18} className="text-pink-500" />
              <span className="font-medium text-gray-900">Edit Profile</span>
            </button>
            
            <button className="w-full p-4 bg-white rounded-2xl text-left hover:bg-gray-50 transition-colors duration-200 shadow-sm border border-gray-100 flex items-center space-x-3">
              <Settings size={18} className="text-purple-500" />
              <span className="font-medium text-gray-900">Discovery Settings</span>
            </button>
            
            <button className="w-full p-4 bg-white rounded-2xl text-left hover:bg-gray-50 transition-colors duration-200 shadow-sm border border-gray-100 flex items-center space-x-3">
              <Shield size={18} className="text-blue-500" />
              <span className="font-medium text-gray-900">Privacy & Safety</span>
            </button>
            
            <button className="w-full p-4 bg-white rounded-2xl text-left hover:bg-gray-50 transition-colors duration-200 shadow-sm border border-gray-100 flex items-center space-x-3">
              <Bell size={18} className="text-green-500" />
              <span className="font-medium text-gray-900">Notifications</span>
            </button>
          </div>
        </div>
      </div>

      <EditProfileModal
        user={user}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfileTab;
