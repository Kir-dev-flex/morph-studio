import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('MORPH landing page', () => {
  it('should introduce the collection in the main landmark', () => {
    render(<App />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'FORM IS NEVER FINAL' }),
    ).toBeInTheDocument();
  });

  it('should link the hero action to the collection', () => {
    render(<App />);

    expect(
      screen.getByRole('link', { name: 'View collection' }),
    ).toHaveAttribute('href', '#collection');
  });

  it('should present both limited-edition objects and availability', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Fold Lamp' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Mass Vessel' }),
    ).toBeInTheDocument();
    expect(screen.getByText('12 of 15 available')).toBeInTheDocument();
    expect(screen.getByText('17 of 20 available')).toBeInTheDocument();
  });

  it('should expose and close the compact navigation menu', () => {
    render(<App />);

    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
