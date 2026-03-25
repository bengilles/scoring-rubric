import React from 'react';

interface RubricCellProps {
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export const RubricCell = ({ description, isSelected, onClick }: RubricCellProps) => {
  return (
    <td 
      onClick={onClick}
      className={`
        p-4 border-b border-r border-gray-300 cursor-pointer text-sm leading-snug transition-all duration-200
        hover:bg-blue-50 relative
        ${isSelected ? 'bg-blue-100 text-blue-900 shadow-inner' : 'bg-white text-gray-800'}
      `}
    >
      <div className="relative z-10">
        {description}
      </div>
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-600 pointer-events-none z-20" />
      )}
    </td>
  );
};