import { useContext } from 'react';
import { describe, expect, it } from 'vitest';
import { Todo } from '../@types/custom';

import TEST_IDS from '../testIds';
import { render, screen } from '../utils/test-utils';
import TodosList from './TodosList';

describe('Componente TodosList', () => {
  const noTasksMessage = 'Sem tarefas. Adicione uma!';
  const today = new Date();
  const todoMock: Todo = {
    id: '1',
    description: 'Test todo',
    status: 'A fazer',
    createdAt: today,
  };

  it('Mostra uma mensagem quando não tem tarefas', () => {
    render(<TodosList />);

    expect(screen.getByText(noTasksMessage))
      .toBeInTheDocument();

    expect(screen.queryByTestId(TEST_IDS.todoList))
      .not.toBeInTheDocument();
  });

  it('Mostra uma lista das tarefas existentes', () => {
    render(<TodosList />, { context: { todos: [todoMock] } });

    expect(screen.getByText(todoMock.description));
    expect(screen.getByText(todoMock.status));
    expect(screen.getByText(today.toLocaleDateString()));

    expect(screen.queryByText(noTasksMessage))
      .not.toBeInTheDocument();
  });
});
