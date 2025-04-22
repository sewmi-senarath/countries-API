import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './SearchBar.css'; // Import custom CSS

function SearchBar({ onSearch, countries }) {
  const countryNames = countries.map((country) => country.name.common);

  const handleSelect = (selected) => {
    if (selected.length > 0) {
      onSearch(selected[0]);
    }
  };

  return (
    <div className="mb-4">
      <Typeahead
        id="country-search"
        labelKey="name"
        options={countryNames}
        placeholder="Search for a country..."
        onChange={handleSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const query = e.target.value;
            if (query.trim()) {
              onSearch(query.trim());
            }
          }
        }}
        className="custom-search-bar" // Add custom class for styling
      />
    </div>
  );
}

export default SearchBar;