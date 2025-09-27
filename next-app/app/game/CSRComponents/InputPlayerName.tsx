import React, { useState } from 'react';

export default function InputName({ submitName }: { submitName: (name: string) => void }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() !== '' && submitName) {
      submitName(name.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && name.trim() !== '') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Enter Your Player Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Player name..."
          className="w-full border-2 border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          autoFocus
        />
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={name.trim() === ''}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
