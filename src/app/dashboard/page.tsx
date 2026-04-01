'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { useTodoStore } from '@/lib/todo-store';
import { apiClient } from '@/lib/api-client';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { FilterButtons } from '@/components/FilterButtons';
import { Todo } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const {
    todos,
    filter,
    isLoading,
    setTodos,
    addTodo,
    updateTodo,
    removeTodo,
    setFilter,
    setIsLoading,
    getFilteredTodos,
  } = useTodoStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadTodos();
  }, [isAuthenticated, router]);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getTodos();
      setTodos(data);
    } catch (err: any) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (
    title: string,
    description: string,
    dueDate: string
  ) => {
    try {
      setError(null);
      const newTodo = await apiClient.createTodo(title, description, dueDate);
      addTodo(newTodo);
    } catch (err: any) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  const handleUpdateTodo = async (id: number, data: Partial<Todo>) => {
    try {
      setError(null);
      const updatedTodo = await apiClient.updateTodo(
        id,
        data.title,
        data.description,
        data.completed,
        data.dueDate ? new Date(data.dueDate).toISOString().split('T')[0] : undefined
      );
      updateTodo(updatedTodo);
    } catch (err: any) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      setError(null);
      await apiClient.deleteTodo(id);
      removeTodo(id);
    } catch (err: any) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Tasks</h1>
        <p className="text-gray-600">
          {todos.length} task{todos.length !== 1 ? 's' : ''} •{' '}
          {todos.filter((t) => t.completed).length} completed
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-sm font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <TodoForm onSubmit={handleAddTodo} isLoading={isLoading} />

      <FilterButtons
        activeFilter={filter.status}
        onFilterChange={(status) => setFilter({ status })}
      />

      <TodoList
        todos={filteredTodos}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
        isLoading={isLoading}
      />
    </div>
  );
}
