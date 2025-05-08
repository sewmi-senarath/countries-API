import { useState } from 'react';

function SearchBar({ onSearch, onViewChange, isMapView, resetSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleViewToggle = () => {
    onViewChange(!isMapView);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text.trim());
  };

  const handleClearSearch = () => {
    setSearchText(''); // Clear the input field
    resetSearch(); // Reset the filtered countries
  };

  return (
    <div className="w-full relative flex gap-2 items-center">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search for a country..."
          className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 card-theme"
        />
      </div>
      <button
        onClick={handleViewToggle}
        className={`px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
          isMapView 
            ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {isMapView ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        )}
        <span>{isMapView ? 'List View' : 'Map View'}</span>
      </button>
      <button
        onClick={handleClearSearch}
        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Clear</span>
      </button>
    </div>
  );
}

export default SearchBar;