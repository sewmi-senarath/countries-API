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
    <div className="d-flex gap-3">
      <div className="flex-fill">
        <select
          className="form-select pastel-dropdown"
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
      <div className="flex-fill">
        <select
          className="form-select pastel-dropdown"
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