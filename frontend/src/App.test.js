import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Welcome text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome — Let's Explore Some Insights/i);
  expect(linkElement).toBeInTheDocument();
});
