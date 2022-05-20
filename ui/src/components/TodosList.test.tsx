import { describe, expect, it } from 'vitest';
import { noTasksMessage, todoMock } from '../test/todoMocks';

import TEST_IDS from '../testIds';
import { render, screen } from '../utils/test-utils';
import TodosList from './TodosList';

describe('Componente TodosList', () => {
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
    expect(screen.getByText(new Date(todoMock.createdAt).toLocaleDateString()));

    expect(screen.queryByText(noTasksMessage))
      .not.toBeInTheDocument();
  });
});
