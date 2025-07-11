
import React, { useState, useRef, useCallback } from 'react';
import { Star, MapPin } from 'lucide-react';
import { User } from '../types/user';

interface PhotoCarouselProps {
  user: User;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ user }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => 
      prev < user.photos.length - 1 ? prev + 1 : 0
    );
  }, [user.photos.length]);

  const prevPhoto = useCallback(() => {
    setCurrentPhotoIndex((prev) => 
      prev > 0 ? prev - 1 : user.photos.length - 1
    );
  }, [user.photos.length]);

  const handleImageError = useCallback((index: number) => {
    console.log('Image failed to load:', user.photos[index]);
    setImageErrors(prev => new Set([...prev, index]));
  }, [user.photos]);

  const handleImageLoad = useCallback((index: number) => {
    console.log('Image loaded successfully:', user.photos[index]);
    setImageErrors(prev => {
      const newErrors = new Set(prev);
      newErrors.delete(index);
      return newErrors;
    });
  }, [user.photos]);

  // Touch event handlers for swipe gestures
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    e.stopPropagation();
  }, [isDragging]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    e.stopPropagation();
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    const deltaY = Math.abs(touch.clientY - startPosRef.current.y);
    
    setIsDragging(false);
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        prevPhoto();
      } else {
        nextPhoto();
      }
    }
  }, [isDragging, nextPhoto, prevPhoto]);

  // Click handlers for navigation
  const handleLeftClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    prevPhoto();
  }, [prevPhoto]);

  const handleRightClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    nextPhoto();
  }, [nextPhoto]);

  // Check if current image has error
  const currentImageHasError = imageErrors.has(currentPhotoIndex);
  const currentImageUrl = user.photos[currentPhotoIndex];

  return (
    <div 
      ref={carouselRef}
      className="relative h-2/3 bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {currentImageUrl ? (
        <img
          key={`${user.id}-${currentPhotoIndex}`}
          src={currentImageUrl}
          alt={`${user.name} photo ${currentPhotoIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
          draggable={false}
          onError={() => handleImageError(currentPhotoIndex)}
          onLoad={() => handleImageLoad(currentPhotoIndex)}
          loading="eager"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="text-center">
            <div className="text-6xl mb-2">📷</div>
            <p className="text-gray-500 text-sm">{user.name}</p>
            <p className="text-gray-400 text-xs">Photo unavailable</p>
          </div>
        </div>
      )}
      
      {/* Photo overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      
      {/* Photo indicators */}
      {user.photos.length > 1 && (
        <div className="absolute top-4 left-4 right-4 flex space-x-2 pointer-events-none">
          {user.photos.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                index === currentPhotoIndex ? 'bg-white shadow-lg' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Photo navigation zones */}
      {user.photos.length > 1 && (
        <>
          <button
            onClick={handleLeftClick}
            className="absolute left-0 top-0 w-1/3 h-full z-10 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Previous photo"
          >
            <div className="bg-black/30 backdrop-blur-sm text-white p-2 rounded-full">
              ‹
            </div>
          </button>
          <button
            onClick={handleRightClick}
            className="absolute right-0 top-0 w-1/3 h-full z-10 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Next photo"
          >
            <div className="bg-black/30 backdrop-blur-sm text-white p-2 rounded-full">
              ›
            </div>
          </button>
          
          {/* Invisible touch zones for mobile */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full z-5"
            onClick={handleLeftClick}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          />
          <div
            className="absolute right-0 top-0 w-1/2 h-full z-5"
            onClick={handleRightClick}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          />
        </>
      )}

      {/* Verified badge */}
      {user.verified && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg backdrop-blur-sm pointer-events-none">
          <Star size={12} className="fill-current" />
          <span>Verified</span>
        </div>
      )}

      {/* Distance & Location */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1 pointer-events-none">
        <MapPin size={12} />
        <span>{user.distance} km away</span>
      </div>
    </div>
  );
};

export default PhotoCarousel;
