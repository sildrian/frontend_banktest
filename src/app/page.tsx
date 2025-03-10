'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { useState, useEffect } from 'react';
import { POST } from '@/app/api/search/route';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      const res = await POST(query);
      setResults(res.data);
      setIsLoading(false);
    };
    fetchResults();
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`?q=${encodeURIComponent(searchQuery)}`);
      setQuery(searchQuery);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {isLoading && <LoadingSpinner fullScreen text="Loading..." />}
      <div className="mb-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
        />
      </div>
      <SearchResults results={results} />
    </div>
  );
}