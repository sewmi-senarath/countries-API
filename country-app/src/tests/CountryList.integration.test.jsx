import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CountryList from '../components/CountryList';
import { renderWithRouter, renderWithAppContext } from '../utils/testUtils';

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
  },
];

describe('CountryList Component Integration Tests', () => {
  // Mock props
  const defaultProps = {
    countries: mockCountries,
    loading: false,
    favorites: [],
    toggleFavorite: vi.fn(),
    compareList: [],
    toggleCompare: vi.fn(),
  };

  // Test 1: Navigation to country detail page
  it('should navigate to country detail page when Details link is clicked', () => {
    renderWithRouter(<CountryList {...defaultProps} />, { route: '/' });

    const usDetailsLink = screen.getAllByRole('link', { name: /details/i })[0];
    expect(usDetailsLink).toHaveAttribute('href', '/country/US');

    fireEvent.click(usDetailsLink);

    // Verify the href attribute (navigation testing with MemoryRouter)
    expect(usDetailsLink).toHaveAttribute('href', '/country/US');
  });

  // Test 2: Display filtered countries
  it('should display filtered countries when countries prop changes', () => {
    const filteredCountries = [mockCountries[0]]; // Only United States
    renderWithRouter(<CountryList {...defaultProps} countries={filteredCountries} />, { route: '/' });

    const countryCards = screen.getAllByRole('article');
    expect(countryCards.length).toBe(1);

    const usCard = countryCards[0];
    expect(within(usCard).getByText('United States')).toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
  });

  // Test 3: Toggle favorite functionality
  it('should call toggleFavorite when favorite button is clicked and update state', () => {
    renderWithRouter(<CountryList {...defaultProps} />, { route: '/' });

    const favoriteButton = screen.getAllByRole('button', {
      name: /add to favorites|remove from favorites/i,
    })[0];
    fireEvent.click(favoriteButton);

    expect(defaultProps.toggleFavorite).toHaveBeenCalledWith(mockCountries[0]);
  });

  // Test 4: Toggle compare functionality
  it('should call toggleCompare when compare button is clicked and update state', () => {
    renderWithRouter(<CountryList {...defaultProps} />, { route: '/' });

    const compareButton = screen.getAllByRole('button', {
      name: /compare|added/i,
    })[0];
    fireEvent.click(compareButton);

    expect(defaultProps.toggleCompare).toHaveBeenCalledWith(mockCountries[0]);
  });

  // Test 5: Display active favorite state
  it('should show active favorite state when country is in favorites', () => {
    const favoritedProps = { ...defaultProps, favorites: [mockCountries[0]] };
    renderWithRouter(<CountryList {...favoritedProps} />, { route: '/' });

    const favoriteButton = screen.getByRole('button', {
      name: /remove from favorites/i,
    });
    expect(favoriteButton).toHaveTextContent('❤️');
    expect(favoriteButton).toHaveClass('bg-red-500/90');
  });

  // Test 6: Search integration
  it('should filter countries when search is triggered', () => {
    renderWithAppContext(
      (propsWithCountries) => <CountryList {...defaultProps} {...propsWithCountries} />,
      mockCountries,
      { loading: false, favorites: [], toggleFavorite: vi.fn(), compareList: [], toggleCompare: vi.fn() }
    );

    // Before search
    let countryCards = screen.getAllByRole('article');
    expect(countryCards.length).toBe(2);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();

    // Simulate search
    fireEvent.click(screen.getByTestId('search-bar-mock'));

    // After search
    countryCards = screen.getAllByRole('article');
    expect(countryCards.length).toBe(1);
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
  });
});