import { useState, useEffect } from 'react';
import '../App.css';

function FilterDropdown({ onFiltersChange }) {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const languages = [
    'All', 'English', 'Spanish', 'French', 'German', 'Chinese', 
    'Arabic', 'Hindi', 'Portuguese', 'Russian', 'Japanese','Sinhala'
  ];

  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    setSelectedRegion(newRegion);
    onFiltersChange({ region: newRegion, language: selectedLanguage });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    onFiltersChange({ region: selectedRegion, language: newLanguage });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      {/* Region Select */}
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500 group-focus-within:text-purple-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <select
          className={`w-full pl-10 pr-4 py-3 rounded-xl shadow-sm border appearance-none focus:outline-none focus:ring-2 transition-all duration-200
            bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-400 focus:ring-blue-200 text-gray-800
            dark:bg-gray-700/80 dark:border-gray-600 dark:focus:border-purple-400 dark:focus:ring-purple-900/30 dark:text-white`}
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          {regions.map((region) => (
            <option 
              key={region} 
              value={region}
              className="bg-white dark:bg-gray-700 dark:text-white"
            >
              {region === 'All' ? 'Filter by Region' : region}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Language Select */}
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500 group-focus-within:text-purple-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.902.902 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.02-.038 2.99-5.982A1 1 0 0113 8z" clipRule="evenodd" />
          </svg>
        </div>
        <select
          className={`w-full pl-10 pr-4 py-3 rounded-xl shadow-sm border appearance-none focus:outline-none focus:ring-2 transition-all duration-200
            bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-400 focus:ring-blue-200 text-gray-800
            dark:bg-gray-700/80 dark:border-gray-600 dark:focus:border-purple-400 dark:focus:ring-purple-900/30 dark:text-white`}
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {languages.map((language) => (
            <option 
              key={language} 
              value={language}
              className="bg-white dark:bg-gray-700 dark:text-white"
            >
              {language === 'All' ? 'Filter by Language' : language}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default FilterDropdown;