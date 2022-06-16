import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { rest } from 'msw';
import TEST_IDS from '../utils/testIds';
import { screen, userEvent } from '../utils/test-utils';
import { todoMock } from '../test/todoMocks';
import { server } from '../test/mockApi/server';
import { API_ENDPOINT, HTTP_STATUS_CODE } from '../test/mockApi/handlers';

import { TodosProvider } from '../context/TodosContext';
import Todos from './Todos';

describe('Componente Todos', () => {
  it('A lista de tarefas aparece ao adicionar uma tarefa', async () => {
    server.use(
      rest.get(API_ENDPOINT, (_req, res, ctx) => res(
        ctx.status(HTTP_STATUS_CODE.OK),
        ctx.json([todoMock]),
      )),
    );

    render(<TodosProvider><Todos /></TodosProvider>);

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
