import React, { useState, useEffect, useCallback } from 'react';
import SwipeCardStack from './SwipeCardStack';
import FilterModal, { FilterOptions } from './FilterModal';
import DiscoverStats from './DiscoverStats';
import DiscoverActions from './DiscoverActions';
import SwipeReactionOverlay from './SwipeReactionOverlay';
import LoadingScreen from './LoadingScreen';
import NoUsersScreen from './NoUsersScreen';
import DailyLimitWarning from './DailyLimitWarning';
import { User } from '../types/user';
import { extendedMockUsers, swipeReactions } from '../data/mockProfiles';
import { ChevronDown, X } from 'lucide-react';

interface DiscoverTabProps {
  onMatch: (user: User) => void;
  onBoost?: () => void;
  onSuperLike?: () => void;
  superLikesCount?: number;
  boostsCount?: number;
  onViewProfile?: (user: User) => void;
  currentUserIndex: number;
  setCurrentUserIndex: (index: number) => void;
}

const DiscoverTab: React.FC<DiscoverTabProps> = ({ 
  onMatch,
  onBoost,
  onSuperLike,
  superLikesCount = 0,
  boostsCount = 0,
  onViewProfile = () => {},
  currentUserIndex,
  setCurrentUserIndex
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(extendedMockUsers);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    ageRange: [18, 35],
    maxDistance: 50,
    interests: [],
    verified: false
  });
  const [dailyLikes, setDailyLikes] = useState(10);
  const [superLikeUsed, setSuperLikeUsed] = useState(false);
  const [recentSwipeReaction, setRecentSwipeReaction] = useState<string | null>(null);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (filteredUsers.length > 0 && currentUserIndex < filteredUsers.length) {
      setCurrentUser(filteredUsers[currentUserIndex]);
    } else {
      setCurrentUser(null);
    }
  }, [currentUserIndex, filteredUsers]);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (!currentUser) return;

    const reaction = direction === 'right' 
      ? swipeReactions.rightSwipe[0] 
      : swipeReactions.leftSwipe[0];
    setRecentSwipeReaction(reaction);
    
    if (direction === 'right') {
      setDailyLikes(prev => Math.max(0, prev - 1));
      if (Math.random() < 0.2) {
        onMatch(currentUser);
      }
    }

    const timer = setTimeout(() => {
      setRecentSwipeReaction(null);
      setCurrentUserIndex(currentUserIndex + 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentUser, currentUserIndex, onMatch, setCurrentUserIndex]);

  const handleRewind = useCallback(() => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setSuperLikeUsed(false);
    }
  }, [currentUserIndex, setCurrentUserIndex]);

  const handleSuperLikeAction = useCallback(() => {
    if (superLikesCount && superLikesCount > 0 && !superLikeUsed && currentUser) {
      setSuperLikeUsed(true);
      setRecentSwipeReaction(swipeReactions.match[0]);
      onSuperLike?.();
      
      const timer = setTimeout(() => {
        setRecentSwipeReaction(null);
        setCurrentUserIndex(currentUserIndex + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentUser, currentUserIndex, onSuperLike, setCurrentUserIndex, superLikeUsed, superLikesCount]);

  const handleApplyFilters = useCallback((appliedFilters: FilterOptions) => {
    setFilters(appliedFilters);
    setIsLoading(true);
    
    const filterTimer = setTimeout(() => {
      const filtered = extendedMockUsers.filter(user => {
        const [minAge, maxAge] = appliedFilters.ageRange;
        const ageMatch = user.age >= minAge && user.age <= maxAge;
        const interestsMatch = appliedFilters.interests.length === 0 || 
          (user.interests?.some(interest => appliedFilters.interests.includes(interest)));
        const verifiedMatch = !appliedFilters.verified || user.verified;
        
        return ageMatch && interestsMatch && verifiedMatch;
      });
      
      setFilteredUsers(filtered);
      setCurrentUserIndex(0);
      setShowFilters(false);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(filterTimer);
  }, [setCurrentUserIndex]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative">
      <DiscoverStats 
        dailyLikes={dailyLikes}
        superLikesRemaining={superLikesCount || 0}
        boostsRemaining={boostsCount || 0}
        onShowFilters={() => setShowFilters(true)}
      />

      <div className="flex-1 relative overflow-hidden">
        {!currentUser || filteredUsers.length === 0 ? (
          <NoUsersScreen 
            onShowFilters={() => setShowFilters(true)}
            onStartOver={() => {
              setCurrentUserIndex(0);
              setFilteredUsers(extendedMockUsers);
            }}
          />
        ) : (
          <div className="relative h-full">
            <SwipeCardStack
              users={filteredUsers}
              currentIndex={currentUserIndex}
              onSwipe={handleSwipe}
              onViewProfile={onViewProfile}
            />

            {/* User Name at Top Left */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-black/50 text-white px-3 py-1 rounded-full">
                <h2 className="font-bold text-lg">{currentUser.name}, {currentUser.age}</h2>
              </div>
            </div>

            {/* Profile Info Toggle at Top Right */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end">
              <button
                onClick={() => setShowProfileInfo(!showProfileInfo)}
                className={`p-2 rounded-full transition-all ${
                  showProfileInfo 
                    ? 'bg-white text-pink-500' 
                    : 'bg-pink-500/90 text-white'
                } shadow-lg hover:scale-110 transform transition-transform duration-200`}
                aria-label={showProfileInfo ? 'Hide profile info' : 'Show profile info'}
              >
                {showProfileInfo ? (
                  <X size={20} className="font-bold" />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {/* Profile Info Panel */}
              {showProfileInfo && currentUser && (
                <div className="mt-2 bg-white rounded-lg p-4 shadow-xl w-64 max-h-[50vh] overflow-y-auto animate-slide-down">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold mb-2">About {currentUser.name}</h3>
                    {currentUser.job && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Occupation:</span> {currentUser.job}
                      </p>
                    )}
                    {currentUser.bio && (
                      <p className="text-sm text-gray-700 mb-3">{currentUser.bio}</p>
                    )}
                    {currentUser.interests?.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Interests</h4>
                        <div className="flex flex-wrap gap-1">
                          {currentUser.interests.map((interest, index) => (
                            <span 
                              key={index} 
                              className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <SwipeReactionOverlay recentSwipeReaction={recentSwipeReaction} />
            <DailyLimitWarning dailyLikes={dailyLikes} />
          </div>
        )}
      </div>

      <DiscoverActions
        onRewind={handleRewind}
        onPass={() => handleSwipe('left')}
        onSuperLike={handleSuperLikeAction}
        onLike={() => handleSwipe('right')}
        onBoost={onBoost}
        superLikesCount={superLikesCount || 0}
        boostsCount={boostsCount || 0}
        dailyLikes={dailyLikes}
        superLikeUsed={superLikeUsed}
        currentUserIndex={currentUserIndex}
        filteredUsersLength={filteredUsers.length}
        showProfileInfo={showProfileInfo}
        toggleProfileInfo={() => setShowProfileInfo(!showProfileInfo)}
      />

      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default DiscoverTab;