import React, { useState } from 'react';

export default function InputWords({ submitWords }: { submitWords: (words: string[]) => void }) {
  const TOTAL_CARDS = 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notes, setNotes] = useState(Array(TOTAL_CARDS).fill(''));

  const handleChange = (e) => {
    const updated = [...notes];
    updated[currentIndex] = e.target.value;
    setNotes(updated);
  };

  const handleNext = () => {
    if (currentIndex < TOTAL_CARDS) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && notes[currentIndex].trim() !== '') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = () => {
    submitWords(notes);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl">
        {currentIndex < TOTAL_CARDS ? (
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Notecard {currentIndex + 1} of {TOTAL_CARDS}
            </h2>
            <textarea
              value={notes[currentIndex]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your note here..."
              className="w-full h-40 border-2 border-gray-300 rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoFocus
            />
            <div className="mt-6">
              <button
                onClick={handleNext}
                disabled={notes[currentIndex].trim() === ''}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-xl"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">All Notecards Completed</h2>
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
