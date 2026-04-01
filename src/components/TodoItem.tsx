'use client';

import { Todo } from '@/types';
import { useState } from 'react';
import { FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, data: Partial<Todo>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isLoading?: boolean;
}

export function TodoItem({
  todo,
  onUpdate,
  onDelete,
  isLoading = false,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
  );

  const handleToggleComplete = async () => {
    await onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleSaveEdit = async () => {
    await onUpdate(todo.id, {
      title: editTitle,
      description: editDescription,
      dueDate: editDueDate ? new Date(editDueDate) : undefined,
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await onDelete(todo.id);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-primary">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={2}
          disabled={isLoading}
        />
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSaveEdit}
            disabled={isLoading}
            className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50 transition"
          >
            <FiSave size={16} />
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            disabled={isLoading}
            className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 disabled:opacity-50 transition"
          >
            <FiX size={16} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border-l-4 transition ${
        todo.completed
          ? 'border-green-500 opacity-75'
          : 'border-primary'
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={isLoading}
          className="mt-1 w-5 h-5 rounded cursor-pointer accent-primary"
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-lg ${
              todo.completed
                ? 'line-through text-gray-500'
                : 'text-gray-800'
            }`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
          )}

          {todo.dueDate && (
            <p className="text-gray-500 text-xs mt-2">
              Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </p>
          )}
        </div>

        <div className="flex gap-2 opacity-0 hover:opacity-100 transition">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="p-2 text-blue-500 hover:bg-blue-100 rounded disabled:opacity-50 transition"
            title="Edit"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-2 text-red-500 hover:bg-red-100 rounded disabled:opacity-50 transition"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
