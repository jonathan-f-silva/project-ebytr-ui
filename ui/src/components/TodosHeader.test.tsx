import { describe, expect, it } from 'vitest';

import TEST_IDS from '../testIds';
import { render, screen } from '../utils/test-utils';
import TodosHeader from './TodosHeader';

describe('Componente TodosHeader', () => {
  it('Tem um input e um botão para adicionar tarefas', () => {
    render(<TodosHeader />);

    expect(screen.getByTestId(TEST_IDS.todoInput)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.todoAddButton)).toBeInTheDocument();
  });
});
