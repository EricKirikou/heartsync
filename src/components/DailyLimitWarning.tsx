
import React from 'react';

interface DailyLimitWarningProps {
  dailyLikes: number;
}

const DailyLimitWarning: React.FC<DailyLimitWarningProps> = ({ dailyLikes }) => {
  if (dailyLikes < 100) return null;

  return (
    <div className="absolute top-16 left-4 right-4 z-30 bg-orange-100 border border-orange-200 rounded-lg p-3">
      <p className="text-orange-800 text-xs font-medium text-center">
        You're approaching your daily like limit! Consider upgrading for unlimited likes.
      </p>
    </div>
  );
};

export default DailyLimitWarning;
