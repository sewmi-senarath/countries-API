import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CountryList from '../components/CountryList';

// Mock data
const mockCountries = [
  {
    cca2: 'US',
    name: { common: 'United States', official: 'United States of America' },
    flags: { png: 'us-flag.png', svg: 'us-flag.svg' },
    capital: ['Washington D.C.'],
    population: 329484123,
    region: 'Americas',
    languages: { eng: 'English' },
  },
  {
    cca2: 'CA',
    name: { common: 'Canada', official: 'Canada' },
    flags: { png: 'ca-flag.png', svg: 'ca-flag.svg' },
    capital: ['Ottawa'],
    population: 38005238,
    region: 'Americas',
    languages: { eng: 'English', fra: 'French' },
  }
];

describe('SearchBar Component Integration Tests', () => {
  it('should filter countries in CountryList when search text is entered', () => {
    // Mock search function
    const mockHandleSearch = vi.fn((query) => {
      return mockCountries.filter(country => 
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
    });

    render(
      <MemoryRouter>
        <SearchBar 
          onSearch={mockHandleSearch}
          onViewChange={vi.fn()}
          isMapView={false}
          resetSearch={vi.fn()}
        />
        <CountryList 
          countries={mockHandleSearch('')} // Initial unfiltered list
          loading={false}
          favorites={[]}
          toggleFavorite={vi.fn()}
          compareList={[]}
          toggleCompare={vi.fn()}
        />
      </MemoryRouter>
    );

    // Verify initial render
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();

    // Simulate search
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'United' } });

    // Verify search was called
    expect(mockHandleSearch).toHaveBeenCalledWith('United');
    
    // Re-render with filtered results
    render(
      <MemoryRouter>
        <SearchBar 
          onSearch={mockHandleSearch}
          onViewChange={vi.fn()}
          isMapView={false}
          resetSearch={vi.fn()}
        />
        <CountryList 
          countries={mockHandleSearch('United')} // Filtered list
          loading={false}
          favorites={[]}
          toggleFavorite={vi.fn()}
          compareList={[]}
          toggleCompare={vi.fn()}
        />
      </MemoryRouter>,
      { container: document.body }
    );

    // Verify filtered results
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
  });

  it('should clear the search input and reset the country list when Clear button is clicked', () => {
    const mockResetSearch = vi.fn();
    const mockHandleSearch = vi.fn((query) => {
      return query ? 
        mockCountries.filter(c => c.name.common.includes(query)) : 
        mockCountries;
    });

    const { rerender } = render(
      <MemoryRouter>
        <SearchBar 
          onSearch={mockHandleSearch}
          onViewChange={vi.fn()}
          isMapView={false}
          resetSearch={mockResetSearch}
        />
        <CountryList 
          countries={mockHandleSearch('United')}
          loading={false}
          favorites={[]}
          toggleFavorite={vi.fn()}
          compareList={[]}
          toggleCompare={vi.fn()}
        />
      </MemoryRouter>
    );

    // Verify initial filtered state
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();

    // Click clear button
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    // Verify reset was called
    expect(mockResetSearch).toHaveBeenCalled();

    // Re-render with cleared state
    rerender(
      <MemoryRouter>
        <SearchBar 
          onSearch={mockHandleSearch}
          onViewChange={vi.fn()}
          isMapView={false}
          resetSearch={mockResetSearch}
        />
        <CountryList 
          countries={mockHandleSearch('')}
          loading={false}
          favorites={[]}
          toggleFavorite={vi.fn()}
          compareList={[]}
          toggleCompare={vi.fn()}
        />
      </MemoryRouter>
    );

    // Verify all countries are shown again
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });
});