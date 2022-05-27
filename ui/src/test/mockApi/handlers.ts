import { rest } from 'msw';
import { Todo } from '../../@types/custom';

const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
};

const DB = {
  todos: [] as Todo[],
  addTodo: (todo: Todo) => {
    DB.todos.push(todo);
  },
  delTodo: (id: Todo['_id']) => {
    DB.todos = DB.todos.filter(({ _id }) => id !== _id);
  },
  changeTodo: (updatedTodo: Todo) => {
    DB.todos = DB.todos.map((todo) => {
      if (todo._id === updatedTodo._id) return updatedTodo;
      return todo;
    });
  },
};

export const handlers = [
  rest.get('/', (req, res, ctx) => res(ctx.status(HTTP_STATUS_CODE.OK))),

  rest.get('/api/todos', (req, res, ctx) => res(
    ctx.status(HTTP_STATUS_CODE.OK),
    ctx.json(DB.todos),
  )),

  rest.post('/api/todos', (req, res, ctx) => {
    const { description } = req.body as Partial<Todo>;
    if (!description) {
      return res(
        ctx.status(HTTP_STATUS_CODE.BAD_REQUEST),
        ctx.json({ message: 'No description!' }),
      );
    }

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
];
