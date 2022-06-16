import { rest } from 'msw';
import { Todo } from '../../@types/custom';

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
};

export const API_ENDPOINT = '/api/todos';

export const DB = {
  todos: [] as Todo[],
  addTodo: (todo: Todo) => {
    DB.todos.push(todo);
  },
  delTodo: (id: Todo['_id']) => {
    DB.todos = DB.todos.filter(({ _id }) => id !== _id);
  },
  updateTodo: (update: Partial<Todo>) => {
    DB.todos = DB.todos.map((todo) => {
      if (todo._id === update._id) return { ...todo, ...update };
      return todo;
    });
  },
};

export const handlers = [
  rest.get('/', (_req, res, ctx) => res(ctx.status(HTTP_STATUS_CODE.OK))),

  rest.get(API_ENDPOINT, (_req, res, ctx) => res(
    ctx.status(HTTP_STATUS_CODE.OK),
    ctx.json(DB.todos),
  )),

  rest.post(API_ENDPOINT, (req, res, ctx) => {
    const { description } = req.body as Todo;

    const newTodo: Todo = {
      _id: String(Math.random()),
      description,
      status: 'A fazer',
      createdAt: new Date().toISOString(),
    };

    DB.addTodo(newTodo);

    return res(
      ctx.status(HTTP_STATUS_CODE.CREATED),
      ctx.json(newTodo),
    );
  }),

  rest.put(`${API_ENDPOINT}/:id`, (req, res, ctx) => {
    const update = req.body as Todo;
    const { id } = req.params;

    DB.updateTodo({ ...update, _id: id as Todo['_id'] });

    return res(
      ctx.status(HTTP_STATUS_CODE.OK),
      ctx.json(DB.todos.find(({ _id }) => _id === id)),
    );
  }),

  rest.delete(`${API_ENDPOINT}/:id`, (req, res, ctx) => {
    const { id } = req.params as { id: string };
    DB.delTodo(id);
    return res(ctx.status(HTTP_STATUS_CODE.NO_CONTENT));
  }),
];
