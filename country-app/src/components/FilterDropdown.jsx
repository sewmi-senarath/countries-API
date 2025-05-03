import { useState } from 'react';

function FilterDropdown({ onRegionFilter, onLanguageFilter }) {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const languages = ['All', 'English', 'Spanish', 'French', 'German', 'Chinese'];

  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    onRegionFilter(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    onLanguageFilter(e.target.value);
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
              {region}
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
              {language}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterDropdown;