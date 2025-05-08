// src/components/SearchBar.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchBar from '../components/SearchBar.jsx';

describe('SearchBar - Safe Test', () => {
  it('renders without crashing', () => {
    render(
      <SearchBar 
        onSearch={() => {}}
        onViewChange={() => {}}
        isMapView={false}
        resetSearch={() => {}}
      />
    );
    expect(
        screen.getByPlaceholderText(
            'Search for a country...'
        )).toBeInTheDocument();
  });
});