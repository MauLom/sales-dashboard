import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Buscar Cliente text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Buscar Cliente/i);
  expect(linkElement).toBeInTheDocument();
});
