import { describe, it } from 'vitest';
import { render, screen } from './utils/test-utils';

import App from './App';

describe('App', () => {
  it('tem o título "Ebytr ToDo"', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { name: 'Ebytr ToDo' }));
  });
});
