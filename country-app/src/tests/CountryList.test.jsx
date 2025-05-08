import { render, screen, within, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CountryList from '../components/CountryList';

describe('CountryList Component', () => {
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

  const renderCountryList = (props = {}) => {
    const defaultProps = {
      countries: mockCountries,
      loading: false,
      favorites: [],
      toggleFavorite: vi.fn(),
      compareList: [],
      toggleCompare: vi.fn(),
    };

    return render(
      <MemoryRouter>
        <CountryList {...defaultProps} {...props} />
      </MemoryRouter>
    );
  };

  it('should display correct country information', () => {
    renderCountryList();
    
    // More reliable way to find country cards
    const countryCards = screen.getAllByRole('article');
    expect(countryCards.length).toBe(2);
    
    // Find US card by its content
    const usCard = countryCards.find(card => 
      within(card).queryByText('United States')
    );
    
    expect(usCard).toBeDefined();
    
    if (usCard) {
      expect(within(usCard).getByText('Washington D.C.')).toBeInTheDocument();
      expect(within(usCard).getByText('Americas')).toBeInTheDocument();
      expect(within(usCard).getByText('329,484,123')).toBeInTheDocument();
    }
  });

  it('should call toggleFavorite when favorite button is clicked', () => {
    const mockToggleFavorite = vi.fn();
    renderCountryList({ toggleFavorite: mockToggleFavorite });

    // Find first favorite button by its aria-label
    const favoriteButton = screen.getAllByRole('button', { 
      name: /add to favorites|remove from favorites/i 
    })[0];
    
    fireEvent.click(favoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCountries[0]);
  });

  it('should show active favorite state for favorited countries', () => {
    renderCountryList({ favorites: [mockCountries[0]] });

    // Verify the favorite button shows active state
    const favoriteButton = screen.getByRole('button', { 
      name: /remove from favorites/i 
    });
    expect(favoriteButton).toHaveTextContent('❤️');
  });

  it('should render pagination controls when needed', () => {
    // Create enough countries to trigger pagination
    const manyCountries = Array.from({ length: 15 }, (_, i) => ({
      cca2: `C${i}`,
      name: { common: `Country ${i}` },
      flags: { png: '', svg: '' },
      capital: ['Capital'],
      population: 1000000,
      region: 'Region',
      languages: { lang: 'Language' },
    }));

    renderCountryList({ countries: manyCountries });

    // Verify pagination controls exist
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});