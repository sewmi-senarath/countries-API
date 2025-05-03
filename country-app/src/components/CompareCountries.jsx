function CompareCountries({ compareList, toggleCompare }) {
    if (compareList.length === 0) return null;
  
    return (
      <div className="mb-6">
        <h5 className="text-lg font-semibold text-gray-800 mb-3">Compare Countries</h5>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-pastelAliceBlue">
                <th className="p-3 text-left text-gray-700">Country</th>
                <th className="p-3 text-left text-gray-700">Capital</th>
                <th className="p-3 text-left text-gray-700">Population</th>
                <th className="p-3 text-left text-gray-700">Region</th>
                <th className="p-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {compareList.map((country) => (
                <tr key={country.cca2} className="border-b border-gray-200 hover:bg-pastelSeashell">
                  <td className="p-3 text-gray-700">{country.name.common}</td>
                  <td className="p-3 text-gray-700">{country.capital?.[0] || 'N/A'}</td>
                  <td className="p-3 text-gray-700">{country.population.toLocaleString()}</td>
                  <td className="p-3 text-gray-700">{country.region}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleCompare(country)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default CompareCountries;