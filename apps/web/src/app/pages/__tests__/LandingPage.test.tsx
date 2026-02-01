import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { LandingPage } from '../LandingPage';

describe('LandingPage', () => {
  it('renders the hero headline and data panel', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Bandeirantes Transparente/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Painel de Dados/i })
    ).toBeInTheDocument();
  });
});
