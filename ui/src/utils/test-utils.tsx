// https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/src/utils/test-utils.tsx

import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';
import { TodosProvider } from '../context/TodosContext';

afterEach(() => {
  cleanup();
});

const customRender = (ui: React.ReactElement, options = {}) => render(ui, {
  // wrap provider(s) here if needed
  wrapper: ({ children }) => (
    <TodosProvider>
      {children}
    </TodosProvider>
  ),
  ...options,
});

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
