function FilterDropdown({ onRegionFilter, onLanguageFilter }) {
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const languages = ['All', 'English', 'Spanish', 'French', 'Arabic'];
  
    return (
      <div className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <select className="form-select" onChange={(e) => onRegionFilter(e.target.value)}>
              <option value="All">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select className="form-select" onChange={(e) => onLanguageFilter(e.target.value)}>
              <option value="All">All Languages</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
  
  export default FilterDropdown;