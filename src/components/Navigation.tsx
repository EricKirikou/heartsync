
import React from 'react';
import { Heart, MessageCircle, User, Users } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'discover', icon: Heart, label: 'Discover' },
    { id: 'matches', icon: Users, label: 'Matches' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200/50 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 transform ${
                isActive
                  ? 'text-white bg-gradient-to-r from-pink-500 to-purple-600 scale-110 shadow-lg'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:scale-95'
              }`}
            >
              <div className={`transition-all duration-200 ${isActive ? 'mb-1' : 'mb-1'}`}>
                <Icon 
                  size={22} 
                  className={`${isActive ? 'fill-current' : ''}`} 
                />
              </div>
              <span className={`text-xs font-medium transition-all duration-200 ${
                isActive ? 'opacity-100' : 'opacity-70'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-1 h-1 bg-white rounded-full opacity-50"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
