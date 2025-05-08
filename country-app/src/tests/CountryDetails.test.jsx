import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import CountryDetail from '../components/CountryDetails';

// Mock axios
vi.mock('axios');

describe('CountryDetail Component', () => {
  const mockCountry = {
    cca2: 'US',
    name: {
      common: 'United States',
      official: 'United States of America'
    },
    flags: {
      png: 'https://flagcdn.com/w320/us.png',
      svg: 'https://flagcdn.com/us.svg'
    },
    capital: ['Washington, D.C.'],
    population: 329484123,
    region: 'Americas',
    subregion: 'North America',
    languages: { eng: 'English' },
    currencies: { USD: { name: 'United States dollar', symbol: '$' } },
    timezones: ['UTC-12:00'],
    area: 9629091,
    maps: {
      googleMaps: 'https://goo.gl/maps/e8M246zY4BSjkjAv6',
      openStreetMaps: 'https://www.openstreetmap.org/relation/148838'
    }
  };

  const renderComponent = (code = 'US', favorites = []) => {
    return render(
      <MemoryRouter initialEntries={[`/country/${code}`]}>
        <Routes>
          <Route 
            path="/country/:code" 
            element={
              <CountryDetail 
                favorites={favorites} 
                toggleFavorite={vi.fn()} 
                resetSearch={vi.fn()} 
              />
            } 
          />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading state initially', () => {
    axios.get.mockImplementation(() => new Promise(() => {}));
    
    renderComponent();
    
    expect(screen.getByText('Loading country details...')).toBeInTheDocument();
  });

  it('should display country data after successful fetch', async () => {
    axios.get.mockResolvedValue({ data: [mockCountry] });
    
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });
  });

  it('should call toggleFavorite when favorite button is clicked', async () => {
    const mockToggleFavorite = vi.fn();
    axios.get.mockResolvedValue({ data: [mockCountry] });
    
    render(
      <MemoryRouter initialEntries={['/country/US']}>
        <Routes>
          <Route 
            path="/country/:code" 
            element={
              <CountryDetail 
                favorites={[]} 
                toggleFavorite={mockToggleFavorite} 
                resetSearch={vi.fn()} 
              />
            } 
          />
        </Routes>
      </MemoryRouter>
    );
    
    // Wait for the component to load
    await screen.findByText('United States');
    
    // Find the favorite button by its accessible role
    const favoriteButton = screen.getByRole('button', { 
      name: /add to favorites|remove from favorites/i 
    });
    
    fireEvent.click(favoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCountry);
  }, 10000); // Increased timeout to 10 seconds

  it('should show "Remove from Favorites" if country is favorited', async () => {
    axios.get.mockResolvedValue({ data: [mockCountry] });
    
    renderComponent('US', [mockCountry]);
    
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /remove from favorites/i })
      ).toBeInTheDocument();
    }, { timeout: 10000 }); // Increased timeout
  });
});