import { describe, it } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from './test/mockApi/server';

import TEST_IDS from './testIds';
import App from './App';
import { TodosProvider } from './context/TodosContext';

describe('App', () => {
  it('tem o título "Ebytr ToDo"', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Ebytr ToDo' }));
  });
});

describe.only('App - uso geral', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());

  const todoText = 'Tarefa';
  const TODOS_QTY = 3;

  it('cria, edita, ordena e remove tarefas', async () => {
    render(<TodosProvider><App /></TodosProvider>);

    const addTodoInput = screen.getByTestId(TEST_IDS.todoInput);

    await userEvent.type(addTodoInput, `${todoText} 1{Enter}`);
    await userEvent.type(addTodoInput, `${todoText} 2{Enter}`);
    await userEvent.type(addTodoInput, `${todoText} 3{Enter}`);

    const createdTodos = await screen.findAllByText(todoText, { exact: false });

    expect(createdTodos).toHaveLength(TODOS_QTY);
  });
});
