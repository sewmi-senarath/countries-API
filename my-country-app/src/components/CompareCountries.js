function CompareCountries({ compareList, toggleCompare }) {
    if (compareList.length === 0) return null;
    return (
      <div className="mb-4">
        <h5>Compare Countries</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Attribute</th>
              {compareList.map((country) => (
                <th key={country.cca2}>
                  {country.name.common}{' '}
                  <button
                    onClick={() => toggleCompare(country)}
                    className="btn btn-sm btn-danger"
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Population</td>
              {compareList.map((country) => (
                <td key={country.cca2}>{country.population.toLocaleString()}</td>
              ))}
            </tr>
            <tr>
              <td>Area (km²)</td>
              {compareList.map((country) => (
                <td key={country.cca2}>{country.area.toLocaleString()}</td>
              ))}
            </tr>
            <tr>
              <td>Languages</td>
              {compareList.map((country) => (
                <td key={country.cca2}>
                  {Object.values(country.languages || {}).join(', ') || 'N/A'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
  export default CompareCountries;