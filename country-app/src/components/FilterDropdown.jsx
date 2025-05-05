import { useState } from 'react';
import '../App.css';

function FilterDropdown({ onFiltersChange }) {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const languages = [
    'All',
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Arabic',
    'Hindi',
    'Portuguese',
    'Russian',
    'Japanese',
    'Tamil',
    'Italian',
    'Dutch',
    'Bengali',
    'Turkish',
    'Vietnamese',
    'Korean',
    'Polish',
    'Sinhala'
  ];

  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

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
    <div className="flex space-x-3">
      <div className="flex-1">
        <select
          className="w-full p-2 bg-pastelHoneydew border border-pastelPaleGreen rounded-md text-gray-700 focus:outline-none focus:border-pastelTurquoise focus:ring-2 focus:ring-pastelTurquoise data-[theme=dark]:bg-pastelHoneydew data-[theme=dark]:text-black data-[theme=dark]:border-pastelPaleGreen"
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region === 'All' ? 'Filter by Region' : region}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <select
          className="w-full p-2 bg-pastelHoneydew border border-pastelPaleGreen rounded-md text-gray-700 focus:outline-none focus:border-pastelTurquoise focus:ring-2 focus:ring-pastelTurquoise data-[theme=dark]:bg-pastelHoneydew data-[theme=dark]:text-black data-[theme=dark]:border-pastelPaleGreen"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language === 'All' ? 'Filter by Language' : language}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterDropdown;