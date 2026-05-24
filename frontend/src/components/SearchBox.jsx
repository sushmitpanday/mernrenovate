import React, { useState } from 'react';

const SearchBox = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    // Agar input khali hai, toh results clear kar do aur return ho jao
    if (value.trim().length === 0) {
      setResults([]);
      return;
    }

    try {
      // 1 ya usse zyada shabd hone par API call hogi
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=au&limit=5&addressdetails=1`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="relative w-full">
      <input 
        type="text" 
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        placeholder="Search Australian areas..." 
        value={query}
        onChange={handleSearch}
      />
      
      {results.length > 0 && (
        <ul className="absolute z-[9999] bg-white border border-gray-200 w-full mt-1 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {results.map((item, index) => (
            <li 
              key={index} 
              className="p-3 hover:bg-blue-50 cursor-pointer text-xs border-b last:border-0"
              onClick={() => {
                onLocationSelect(item.display_name);
                setQuery(item.display_name);
                setResults([]);
              }}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;