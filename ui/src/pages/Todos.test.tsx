import { describe, expect, it, vi } from 'vitest';
import { render as renderWithoutWrapper } from '@testing-library/react';

import TEST_IDS from '../testIds';
import { render, screen, userEvent } from '../utils/test-utils';
import Todos from './Todos';
import { TodosProvider } from '../context/TodosContext';

describe('Componente Todos', () => {
  const todoDescription = 'Test todo';

  it('A lista de tarefas aparece ao adicionar uma tarefa', async () => {
    renderWithoutWrapper(<TodosProvider><Todos /></TodosProvider>);

    const input = screen.getByTestId(TEST_IDS.todoInput);
    const button = screen.getByTestId(TEST_IDS.todoAddButton);
    expect(screen.queryByTestId(TEST_IDS.todoList)).not.toBeInTheDocument();

    await userEvent.type(input, todoDescription);
    await userEvent.click(button);

    const list = screen.queryByTestId(TEST_IDS.todoList);
    expect(list).toBeInTheDocument();
    expect(screen.getByText(todoDescription)).toBeInTheDocument();
  });
});
