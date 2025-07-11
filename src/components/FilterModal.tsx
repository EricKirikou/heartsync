import React, { useState } from 'react';
import { X, Sliders } from 'lucide-react';

// Interface for filter options
export interface FilterOptions {
  ageRange: [number, number];
  maxDistance: number;
  interests: string[];
  verified: boolean;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  
  const availableInterests = [
    'Travel', 'Photography', 'Music', 'Fitness', 'Cooking', 'Reading',
    'Art', 'Movies', 'Gaming', 'Dancing', 'Hiking', 'Coffee', 'Wine',
    'Yoga', 'Sports', 'Technology', 'Fashion', 'Food'
  ];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleAgeRangeChange = (index: 0 | 1, value: number) => {
    setFilters(prev => {
      const newAgeRange = [...prev.ageRange] as [number, number];
      newAgeRange[index] = value;
      return { ...prev, ageRange: newAgeRange };
    });
  };

  const handleDistanceChange = (value: number) => {
    setFilters(prev => ({ ...prev, maxDistance: value }));
  };

  const toggleInterest = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleVerified = () => {
    setFilters(prev => ({ ...prev, verified: !prev.verified }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white rounded-t-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-gray-100 rounded-full"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>

          {/* Age Range Filter */}
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-2">Age Range</h3>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="18"
                max="65"
                value={filters.ageRange[0]}
                onChange={(e) => handleAgeRangeChange(0, parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                aria-label="Minimum age"
              />
              <span className="text-xs text-gray-600 w-14 text-center">
                {filters.ageRange[0]} - {filters.ageRange[1]}
              </span>
              <input
                type="range"
                min="18"
                max="65"
                value={filters.ageRange[1]}
                onChange={(e) => handleAgeRangeChange(1, parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                aria-label="Maximum age"
              />
            </div>
          </div>

          {/* Distance Filter */}
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-2">Maximum Distance (km)</h3>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1"
                max="100"
                value={filters.maxDistance}
                onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                aria-label="Maximum distance"
              />
              <span className="text-xs text-gray-600 w-10">{filters.maxDistance}</span>
            </div>
          </div>

          {/* Verified Filter */}
          <div className="mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={toggleVerified}
                className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
              />
              <span className="text-base">Verified profiles only</span>
            </label>
          </div>

          {/* Interests Filter */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-2">Interests</h3>
            <div className="flex flex-wrap gap-1.5">
              {availableInterests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filters.interests.includes(interest)
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={filters.interests.includes(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold text-base hover:from-pink-600 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;