import React, { useState, useRef, useCallback, useEffect } from 'react';
import SwipeCard from './SwipeCard';
import { User } from '../types/user';

interface SwipeCardStackProps {
  users: User[];
  currentIndex: number;
  onSwipe: (direction: 'left' | 'right', userId?: string) => void;
  onViewProfile?: (user: User) => void;
}

const SwipeCardStack: React.FC<SwipeCardStackProps> = ({ 
  users, 
  currentIndex, 
  onSwipe, 
  onViewProfile 
}) => {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const stackRef = useRef<HTMLDivElement>(null);

  // Preload next image
  useEffect(() => {
    if (users[currentIndex + 1]?.photos?.[0]) {
      const img = new Image();
      img.src = users[currentIndex + 1].photos[0];
    }
  }, [currentIndex, users]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    const deltaY = touch.clientY - startPosRef.current.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 100) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      const currentUser = users[currentIndex];
      if (currentUser) {
        onSwipe(direction, currentUser.id);
      }
    }
    
    setDragOffset({ x: 0, y: 0 });
  }, [isDragging, dragOffset.x, users, currentIndex, onSwipe]);

  // ... (keep existing mouse handlers the same as before)

  if (users.length === 0) return null;

  const visibleCards = users.slice(currentIndex, currentIndex + 3);

  return (
    <div 
      ref={stackRef}
      className="relative w-full h-full max-w-md mx-auto"
      style={{ height: '70vh', touchAction: 'none' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // ... (keep existing mouse handlers)
    >
      {visibleCards.map((user, index) => {
        const isTop = index === 0;
        const zIndex = visibleCards.length - index;
        const scale = 1 - (index * 0.05);
        const yOffset = index * 8;
        
        let transform = `scale(${scale}) translateY(${yOffset}px)`;
        let opacity = 1 - (index * 0.2);
        
        if (isTop && isDragging) {
          const rotation = dragOffset.x * 0.1;
          transform = `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg) scale(${scale}) translateY(${yOffset}px)`;
          opacity = 1 - Math.abs(dragOffset.x) / 300;
        }

        return (
          <div
            key={user.id}
            className="absolute inset-0"
            style={{
              zIndex,
              transform,
              opacity,
              transition: isDragging && isTop ? 'none' : 'all 0.3s ease-out',
              pointerEvents: isTop ? 'auto' : 'none'
            }}
          >
            <SwipeCard
              user={user}
              isTop={isTop}
              onViewProfile={onViewProfile}
            />
          </div>
        );
      })}
      
      {/* Swipe Indicators */}
      {isDragging && (
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-8 transform -translate-y-1/2 transition-opacity duration-200 z-30 ${
            dragOffset.x < -50 ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg border-4 border-red-400 rotate-12">
              NOPE
            </div>
          </div>
          <div className={`absolute top-1/2 right-8 transform -translate-y-1/2 transition-opacity duration-200 z-30 ${
            dragOffset.x > 50 ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg border-4 border-green-400 -rotate-12">
              LIKE
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipeCardStack;