'use client';
import { FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Customer"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-5 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-blue-600"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}