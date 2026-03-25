import React, { useState, useMemo, useRef } from 'react';
import { RUBRIC_DATA, SCORE_LEVELS } from './constants';
import { RubricRow } from './components/RubricRow';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const App = () => {
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [rubricTitle, setRubricTitle] = useState<string>('');
  const rubricRef = useRef<HTMLDivElement>(null);

  const handleSelect = (rowId: string, points: number) => {
    setSelections((prev) => {
      // If the clicked cell is already selected, deselect it
      if (prev[rowId] === points) {
        const { [rowId]: _, ...rest } = prev;
        return rest;
      }
      // Otherwise, update selection for this row
      return {
        ...prev,
        [rowId]: points,
      };
    });
  };

  const totalScore = useMemo(() => {
    return Object.values(selections).reduce((sum, points) => sum + points, 0);
  }, [selections]);

  const maxScore = RUBRIC_DATA.length * 20;
  const completionPercentage = Math.round((Object.keys(selections).length / RUBRIC_DATA.length) * 100);

  const exportImage = async () => {
    if (!rubricRef.current) return;
    
    const canvas = await html2canvas(rubricRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#f3f4f6', // gray-100
    });
    
    const link = document.createElement('a');
    link.download = `${rubricTitle.trim() || 'rubric'}-scoring.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const exportPDF = async () => {
    if (!rubricRef.current) return;

    const canvas = await html2canvas(rubricRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#f3f4f6',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${rubricTitle.trim() || 'rubric'}-scoring.pdf`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100 flex flex-col items-center">
      <div ref={rubricRef} className="w-full max-w-[1400px] bg-white shadow-xl rounded-sm overflow-hidden border border-gray-400 p-1">
        
        {/* Main Title */}
        <div className="bg-[#E0E0E0] border-b border-gray-400 p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-700 tracking-tight mb-6">
            Words About Books Review Scoring Rubric
          </h1>
          
          <div className="max-w-2xl mx-auto flex flex-col gap-2">
            <label htmlFor="book-title" className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] text-center">
              Book Title
            </label>
            <input
              id="book-title"
              type="text"
              placeholder="e.g. The Great Gatsby"
              value={rubricTitle}
              onChange={(e) => setRubricTitle(e.target.value)}
              className="w-full bg-white/60 border-b-2 border-gray-400 focus:border-blue-600 outline-none px-4 py-2 text-2xl text-center text-gray-800 placeholder:text-gray-400 transition-all"
            />
          </div>
        </div>

        {/* Subheader / Instructions */}
        <div className="bg-[#1A5F9A] border-b border-gray-400 p-3 text-white text-center text-sm md:text-base font-normal">
          <p>Intended for use with published fiction. Non-fiction or unpublished/unfinished works shouldn't be rated with this rubric.</p>
        </div>

        {/* Responsive Wrapper for Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr>
                {/* Empty top-left corner for row titles */}
                <th className="border-r border-b border-gray-300 bg-white w-48"></th>
                
                {/* Score Column Headers */}
                {SCORE_LEVELS.map((level) => (
                  <th key={level.score} className="border-r border-b border-gray-300 bg-white p-3 min-w-[160px] w-[16.66%]">
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-bold text-gray-800 mb-1">{level.label}</span>
                      <span className="text-sm text-gray-500 italic font-medium">{level.subLabel}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RUBRIC_DATA.map((row) => (
                <RubricRow
                  key={row.id}
                  data={row}
                  selectedValue={selections[row.id]}
                  onSelect={(points) => handleSelect(row.id, points)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary section in the export */}
        <div className="p-6 bg-gray-50 border-t border-gray-300 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-700 uppercase tracking-wider">Final Score</h3>
            <p className="text-sm text-gray-500 italic">Words About Books Scoring System</p>
          </div>
          <div className="text-right">
            <span className="text-5xl font-black text-blue-900">{totalScore}</span>
            <span className="text-xl text-gray-400 ml-2">/ {maxScore}</span>
          </div>
        </div>
      </div>

      {/* Floating Score Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-8 w-full md:w-auto">
            <div className="flex flex-col">
               <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Progress</span>
               <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-600">{Object.keys(selections).length}/{RUBRIC_DATA.length}</span>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold leading-none mb-1">Total Score</p>
                  <div className="text-2xl font-bold text-blue-800 tabular-nums leading-none">
                    {totalScore} <span className="text-xs text-gray-400 font-normal">/ {maxScore}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
             <button 
                onClick={exportImage}
                className="flex-1 md:flex-none px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
               Image
             </button>
             <button 
                onClick={exportPDF}
                className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
             >
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
               PDF
             </button>
             <div className="w-px h-8 bg-gray-200 mx-2 hidden md:block" />
             <button 
                onClick={() => {
                  if (confirm('Are you sure you want to reset all selections?')) {
                    setSelections({});
                    setRubricTitle('');
                  }
                }}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors font-medium"
             >
               Reset
             </button>
          </div>
        </div>
      </div>

      {/* Padding for footer */}
      <div className="h-32" />
    </div>
  );
};

export default App;
