import React, { useState } from 'react';
import { User } from '../types/user';

interface SwipeCardProps {
  user: User;
  isTop: boolean;
  onViewProfile?: (user: User) => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onViewProfile }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + 
      encodeURIComponent(user.name) + '&background=random&size=400';
  };

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100">
      {/* Photo Gallery */}
      {user.photos?.length > 0 ? (
        <div className="relative h-full w-full">
          <img
            src={user.photos[currentPhotoIndex]}
            alt={`${user.name}'s profile`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                {user.name.charAt(0)}
              </span>
            </div>
          )}

          {/* Photo Indicator Dots */}
          {user.photos.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {user.photos.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPhotoIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPhotoIndex(index);
                    setImageLoaded(false);
                  }}
                  aria-label={`View photo ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">
            {user.name.charAt(0)}
          </span>
        </div>
      )}

      {/* Profile Info Overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white cursor-pointer"
        onClick={() => onViewProfile?.(user)}
      >
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">{user.name}, {user.age}</h2>
            {user.bio && <p className="text-sm mt-1 line-clamp-2">{user.bio}</p>}
          </div>
          {user.verified && (
            <span className="bg-blue-500 text-white p-1 rounded-full text-xs">
              ✓ Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;