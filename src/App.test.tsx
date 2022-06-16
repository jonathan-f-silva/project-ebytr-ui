import { describe, it } from 'vitest';

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TEST_IDS from './utils/testIds';
import App from './App';
import { TodosProvider } from './context/TodosContext';
import { DB } from './test/mockApi/handlers';
import { todoMocks } from './test/todoMocks';

describe('App', () => {
  it('tem o título "Ebytr ToDo"', async () => {
    render(<TodosProvider><App /></TodosProvider>);

    expect(await screen.findByRole('heading', { name: 'Ebytr ToDo' }));
  });
});

describe('App - uso geral', () => {
  const todoText = 'Teste de tarefa';
  const TODOS_QTY = 4;
  DB.todos = todoMocks;

  it('cria, edita, ordena e remove tarefas', async () => {
    render(<TodosProvider><App /></TodosProvider>);

    const addTodoInput = await screen.findByTestId(TEST_IDS.todoInput);

    await userEvent.type(addTodoInput, `${todoText}{Enter}`);

    const todoList = await screen.findByTestId(TEST_IDS.todoList);
    await waitFor(() => expect(todoList.children).toHaveLength(TODOS_QTY));

    const newText = 'Nova descrição';
    const editButtons = await within(todoList)
      .findAllByRole('button', { name: /editar/i });
    await userEvent.click(editButtons[1]);

    const editInput = await within(todoList).findByRole('textbox');
    await userEvent.clear(editInput);
    await userEvent.type(editInput, newText);

    const saveButton = await within(todoList)
      .findByRole('button', { name: /salvar/i });
    await userEvent.click(saveButton);

    const delButtons = within(todoList)
      .getAllByRole('button', { name: /deletar/i });
    await userEvent.click(delButtons[0]);

    await screen.findByText(newText);
    await screen.findByText(todoText);
  });
});
