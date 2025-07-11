
import React from 'react';
import { User } from '../types/user';

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {user.name}
          <span className="text-lg text-gray-600 font-normal">, {user.age}</span>
        </h2>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {user.lastActive}
        </div>
      </div>
      
      <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">{user.bio}</p>
      
      {/* Interests */}
      <div className="flex flex-wrap gap-2">
        {user.interests.slice(0, 3).map((interest, index) => (
          <span
            key={interest}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              index === 0 ? 'bg-pink-100 text-pink-700' :
              index === 1 ? 'bg-purple-100 text-purple-700' :
              'bg-blue-100 text-blue-700'
            }`}
          >
            {interest}
          </span>
        ))}
        {user.interests.length > 3 && (
          <span className="text-gray-500 text-xs px-2 py-1">
            +{user.interests.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
