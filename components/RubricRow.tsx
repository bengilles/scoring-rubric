import React from 'react';
import { SCORE_LEVELS } from '../constants';
import { RubricCell } from './RubricCell';

interface RubricRowProps {
  data: {
    id: string;
    title: string;
    descriptions: any; // keeping loose to match constants inferred type easily
  };
  selectedValue?: number;
  onSelect: (points: number) => void;
}

export const RubricRow = ({ data, selectedValue, onSelect }: RubricRowProps) => {
  return (
    <tr>
      {/* Row Title */}
      <th className="p-4 text-left bg-white border-b border-r border-gray-300 w-48 font-bold text-gray-900 align-top">
        {data.title}
      </th>

      {/* Score Cells */}
      {SCORE_LEVELS.map((level) => (
        <RubricCell
          key={level.score}
          description={data.descriptions[level.score]}
          isSelected={selectedValue === level.points}
          onClick={() => onSelect(level.points)}
        />
      ))}
    </tr>
  );
};