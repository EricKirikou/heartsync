
import React from 'react';
import { Sliders } from 'lucide-react';

interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors px-2 py-1 rounded-lg hover:bg-pink-50"
    >
      <Sliders size={16} />
      <span className="font-medium text-sm">Filters</span>
    </button>
  );
};

export default FilterButton;
