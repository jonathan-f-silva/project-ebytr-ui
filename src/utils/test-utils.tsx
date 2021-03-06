// https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/src/utils/test-utils.tsx

import { cleanup, render } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { TodosContext, TodosContextType } from '../context/TodosContext';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const customRender = (
  ui: React.ReactElement,
  options = {
    context: { todos: [], addTodo: () => {} } as unknown,
  },
) => render(ui, {
  // wrap provider(s) here if needed
  wrapper: ({ children }) => (
    <TodosContext.Provider
      value={ options.context as TodosContextType }
    >
      {children}
    </TodosContext.Provider>
  ),
  ...options,
});

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
