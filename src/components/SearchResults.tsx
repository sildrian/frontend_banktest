interface SearchResult {
    title: string;
    link: string;
    description: string;
  }
  
  interface SearchResultsProps {
    results: any[];
  }
  
  const SearchResults = ({ results }: SearchResultsProps) => {
    return (
      <div className="space-y-6">
        {results.map((result, index) => (
          <div key={index} className="border-b pb-4">
            <a href={''} className="text-blue-600 hover:underline text-xl">
              {result.name}
            </a>
            <p className="text-sm text-gray-600 mt-1">{result.bank.name} - {result.bank.account}</p>
            <p className="text-sm text-gray-600 mt-1"><span className="font-bold">Total Saldo : </span>{result.total_saldo}</p>
            <p className="text-sm text-gray-600 mt-1">{result.address}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default SearchResults;