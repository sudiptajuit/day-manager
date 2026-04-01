'use client';

interface FilterButtonsProps {
  activeFilter: 'all' | 'completed' | 'pending';
  onFilterChange: (filter: 'all' | 'completed' | 'pending') => void;
}

export function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  const filters = [
    { id: 'all', label: 'All Tasks', icon: '📋' },
    { id: 'pending', label: 'Pending', icon: '⏳' },
    { id: 'completed', label: 'Completed', icon: '✅' },
  ] as const;

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            activeFilter === filter.id
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <span>{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
}
