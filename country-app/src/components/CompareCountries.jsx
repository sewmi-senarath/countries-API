function CompareCountries({ compareList, toggleCompare }) {
  if (compareList.length === 0) return null;

  // Calculate comparison metrics
  const metrics = compareList.map(country => ({
    population: country.population,
    area: country.area,
    density: country.population / country.area,
    gdp: country.gdp || 0,
  }));

  // Find highest values for visual comparison
  const maxValues = {
    population: Math.max(...metrics.map(m => m.population)),
    area: Math.max(...metrics.map(m => m.area)),
    density: Math.max(...metrics.map(m => m.density)),
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Country Comparison
        </h2>
        <p className="text-gray-600 mt-1">Compare up to 3 countries side by side</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
              <th className="p-4 text-left text-gray-700 font-semibold">Metrics</th>
              {compareList.map(country => (
                <th key={country.cca2} className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <img 
                      src={country.flags.png} 
                      alt={`Flag of ${country.name.common}`}
                      className="w-12 h-8 object-cover rounded shadow-sm mb-2"
                    />
                    <span className="font-semibold text-gray-800">{country.name.common}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Basic Information */}
            <tr className="border-b border-gray-100">
              <td className="p-4 text-gray-600 font-small">Capital</td>
              {compareList.map(country => (
                <td key={country.cca2} className="p-4 text-center text-gray-800">
                  {country.capital?.[0] || 'N/A'}
                </td>
              ))}
            </tr>

            {/* Population with Visual Bar */}
            <tr className="border-b border-gray-100">
              <td className="p-4 text-gray-600 font-small">Population</td>
              {compareList.map((country, index) => (
                <td key={country.cca2} className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(country.population / maxValues.population) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-800">{country.population.toLocaleString()}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Region */}
            <tr className="border-b border-gray-100">
              <td className="p-4 text-gray-600 font-small">Region</td>
              {compareList.map(country => (
                <td key={country.cca2} className="p-4 text-center text-gray-800">
                  {country.region}
                  <span className="text-gray-500 text-sm block">{country.subregion}</span>
                </td>
              ))}
            </tr>

            {/* Languages */}
            <tr className="border-b border-gray-100">
              <td className="p-4 text-gray-600 font-small">Languages</td>
              {compareList.map(country => (
                <td key={country.cca2} className="p-4 text-center text-gray-800">
                  {Object.values(country.languages || {}).join(', ') || 'N/A'}
                </td>
              ))}
            </tr>

            {/* Actions Row */}
            <tr>
              <td className="p-4 text-gray-600 font-small">Actions</td>
              {compareList.map(country => (
                <td key={country.cca2} className="p-4 text-center">
                  <button
                    onClick={() => toggleCompare(country)}
                    className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    Remove from Comparison
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompareCountries;