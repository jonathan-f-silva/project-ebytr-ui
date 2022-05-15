import { describe, it } from 'vitest';
import App from './App';

import { render } from './utils/test-utils';

describe('App', () => {
  it('renderiza sem problemas', () => {
    render(<App />);
  });
});
