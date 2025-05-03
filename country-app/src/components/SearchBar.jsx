import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function SearchBar({ onSearch, countries }) {
  const countryNames = countries.map((country) => country.name.common);

  const handleSelect = (selected) => {
    if (selected.length > 0) {
      onSearch(selected[0]);
    }
  };

  return (
    <div className="mb-6">
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
        className="w-full max-w-md"
        inputProps={{
          className:
            'w-full text-xl p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pastelTurquoise focus:ring-2 focus:ring-pastelTurquoise data-[theme=dark]:bg-gray-300 data-[theme=dark]:text-black data-[theme=dark]:border-gray-400',
        }}
        renderMenu={(results, menuProps) => (
          <div {...menuProps} className="bg-pastelAliceBlue border border-pastelBlue rounded-md max-h-72 overflow-y-auto">
            {results.map((result, index) => (
              <div key={index} className="px-4 py-2 text-gray-800 data-[theme=dark]:text-black hover:bg-pastelTurquoise cursor-pointer">
                {result}
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
}

export default SearchBar;