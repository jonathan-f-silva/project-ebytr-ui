import { describe, expect, it, vi } from 'vitest';

import TEST_IDS from '../testIds';
import { render, screen, userEvent } from '../utils/test-utils';
import TodosHeader from './TodosHeader';

describe('Componente TodosHeader', () => {
  const todoDescription = 'Test todo';

  it('Tem um input e um botão para adicionar tarefas', () => {
    render(<TodosHeader />);

    expect(screen.getByTestId(TEST_IDS.todoInput)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.todoAddButton)).toBeInTheDocument();
  });

  it('Ao clicar no botão é adicionada uma tarefa', async () => {
    const mockAddTodo = vi.fn();

    render(<TodosHeader />, { context: { addTodo: mockAddTodo } });

    const input = screen.getByTestId(TEST_IDS.todoInput);
    const button = screen.getByTestId(TEST_IDS.todoAddButton);

    await userEvent.type(input, todoDescription);
    await userEvent.click(button);

    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith(todoDescription);
  });

  it('Ao digitar enter é adicionada uma tarefa', async () => {
    const mockAddTodo = vi.fn();

    render(<TodosHeader />, { context: { addTodo: mockAddTodo } });

    const input = screen.getByTestId(TEST_IDS.todoInput);

    await userEvent.type(input, `${todoDescription}{Enter}`);

    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith(todoDescription);
  });

  it('Não pode adicionar tarefa vazia', async () => {
    const mockAddTodo = vi.fn();

    render(<TodosHeader />, { context: { addTodo: mockAddTodo } });

    const input = screen.getByTestId(TEST_IDS.todoInput);
    const button = screen.getByTestId(TEST_IDS.todoAddButton);

    await userEvent.click(input);
    await userEvent.click(button);

    expect(mockAddTodo).toHaveBeenCalledTimes(0);
  });

  it('Chama updateTodoStatus ao alterar a ordenação', async () => {
    const setSortOption = vi.fn();
    render(<TodosHeader />, { context: { setSortOption } });

    const statusButtons = screen.getByTestId(TEST_IDS.todoSortSelect);

    await userEvent.selectOptions(statusButtons, 'description');

    expect(setSortOption).toHaveBeenCalledOnce();
  });
});
