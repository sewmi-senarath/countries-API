// import { render } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import { useState } from 'react';

// // Utility to render components with react-router-dom
// export const renderWithRouter = (component, { route = '/', initialEntries = [route], ...options } = {}) => {
//   return render(
//     <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
//       {component}
//     </MemoryRouter>,
//     options
//   );
// };

// // Mock App wrapper to simulate state management (e.g., for search functionality)
// export const renderWithAppContext = (component, initialCountries, initialProps = {}) => {
//   const MockAppWrapper = ({ children }) => {
//     const [filteredCountries, setFilteredCountries] = useState(initialCountries);

//     const handleSearch = (query) => {
//       if (!query) {
//         setFilteredCountries(initialCountries);
//         return;
//       }
//       const filtered = initialCountries.filter((country) =>
//         country.name.common.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredCountries(filtered);
//     };

//     return (
//       <MemoryRouter initialEntries={['/']}>
//         {children({ filteredCountries, handleSearch, ...initialProps })}
//       </MemoryRouter>
//     );
//   };

//   return render(
//     <MockAppWrapper>
//       {({ filteredCountries, handleSearch, ...props }) => (
//         <>
//           <div data-testid="search-bar-mock" onClick={() => handleSearch('United')}>
//             Mock SearchBar
//           </div>
//           {component({ countries: filteredCountries, ...props })}
//         </>
//       )}
//     </MockAppWrapper>
//   );
// };

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useState } from 'react';

// Utility to render components with react-router-dom
export const renderWithRouter = (component, { route = '/', initialEntries = [route], ...options } = {}) => {
  return render(
    <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
      {component}
    </MemoryRouter>,
    options
  );
};

// Mock App wrapper to simulate state management (e.g., for search functionality)
export const renderWithAppContext = (component, initialCountries, initialProps = {}) => {
  const MockAppWrapper = ({ children }) => {
    const [filteredCountries, setFilteredCountries] = useState(initialCountries);

    const handleSearch = (query) => {
      if (!query) {
        setFilteredCountries(initialCountries);
        return;
      }
      const filtered = initialCountries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    };

    return (
      <MemoryRouter initialEntries={['/']}>
        {children({ countries: filteredCountries, handleSearch, ...initialProps })}
      </MemoryRouter>
    );
  };

  return render(
    <MockAppWrapper>
      {({ countries, handleSearch, ...props }) => (
        <>
          <div data-testid="search-bar-mock" onClick={() => handleSearch('United')}>
            Mock SearchBar
          </div>
          {component({ countries, ...props })}
        </>
      )}
    </MockAppWrapper>
  );
};