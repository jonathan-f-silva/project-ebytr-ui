import { describe, expect, it, vi } from 'vitest';
import { noTasksMessage, todoMock, todoMocks } from '../test/todoMocks';

import TEST_IDS from '../utils/testIds';
import { render, screen, userEvent } from '../utils/test-utils';
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

  it('Chama deleteTodo ao clicar em remover tarefa', async () => {
    const deleteTodo = vi.fn();
    render(<TodosList />, { context: { todos: todoMocks, deleteTodo } });

    const delButtons = screen.getAllByTestId(
      TEST_IDS.todoDelButton, { exact: false },
    );

    await userEvent.click(delButtons[0]);

    expect(deleteTodo).toHaveBeenCalledOnce();
  });

  it('Chama updateTodo ao editar a tarefa e salvar', async () => {
    const updateTodo = vi.fn();
    render(<TodosList />, { context: { todos: todoMocks, updateTodo } });

    const editButtons = screen.getAllByRole('button', { name: /editar/i });
    await userEvent.click(editButtons[1]);

    const editInput = screen.getByRole('textbox');
    await userEvent.type(editInput, 'Another thing');

    const saveButton = screen.getByRole('button', { name: /salvar/i });
    await userEvent.click(saveButton);

    expect(updateTodo).toHaveBeenCalledOnce();
  });

  it('Chama updateTodoStatus ao clicar no status', async () => {
    const updateTodoStatus = vi.fn();
    render(<TodosList />, { context: { todos: todoMocks, updateTodoStatus } });

    const statusButtons = screen.getAllByTestId(
      TEST_IDS.todoStatusButton, { exact: false },
    );

    await userEvent.click(statusButtons[1]);
    await userEvent.click(statusButtons[1]);

    expect(updateTodoStatus).toHaveBeenCalledTimes(2);
  });
});
