import { describe, expect, it, vi } from 'vitest';
import { render as renderWithoutWrapper } from '@testing-library/react';

import axios from 'axios';

import TEST_IDS from '../testIds';
import { screen, userEvent } from '../utils/test-utils';
import Todos from './Todos';
import { TodosProvider } from '../context/TodosContext';
import { todoMock } from '../test/todoMocks';

vi.mock('axios');

describe('Componente Todos', () => {
  it('A lista de tarefas aparece ao adicionar uma tarefa', async () => {
    axios.create = vi.fn().mockImplementation(() => axios);
    axios.get = vi.fn()
      // .mockResolvedValueOnce({ data: [] })
      .mockResolvedValue({ data: [todoMock] });

    renderWithoutWrapper(<TodosProvider><Todos /></TodosProvider>);

    const input = screen.getByTestId(TEST_IDS.todoInput);
    const button = screen.getByTestId(TEST_IDS.todoAddButton);
    expect(screen.queryByTestId(TEST_IDS.todoList)).not.toBeInTheDocument();

    await userEvent.type(input, todoMock.description);
    await userEvent.click(button);

    const list = await screen.findByTestId(TEST_IDS.todoList);

    expect(list).toBeInTheDocument();
    expect(screen.getByText(todoMock.description)).toBeInTheDocument();
  });
});
