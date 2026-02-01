import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '../Layout';

describe('Layout', () => {
  it('renders main navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('SIGA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Iniciativas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Transpar/i })).toBeInTheDocument();
  });
});
