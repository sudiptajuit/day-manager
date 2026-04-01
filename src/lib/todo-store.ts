import { create } from 'zustand';
import { Todo } from '@/types';

interface TodoFilter {
  status: 'all' | 'completed' | 'pending';
}

interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  isLoading: boolean;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  setFilter: (filter: TodoFilter) => void;
  setIsLoading: (loading: boolean) => void;
  getFilteredTodos: () => Todo[];
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: { status: 'all' },
  isLoading: false,
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  updateTodo: (updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  setFilter: (filter) => set({ filter }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  getFilteredTodos: () => {
    const { todos, filter } = get();
    if (filter.status === 'completed') {
      return todos.filter((t) => t.completed);
    }
    if (filter.status === 'pending') {
      return todos.filter((t) => !t.completed);
    }
    return todos;
  },
}));
