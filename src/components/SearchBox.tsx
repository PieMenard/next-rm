import { FormEvent } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

type SearchBoxProps = {
  query: string;
  setQuery: (t: string) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
};

const SearchBox = ({ query, setQuery, handleSearch }: SearchBoxProps) => {
  return (
    <div className="my-4">
      <form onSubmit={handleSearch} className="flex justify-center gap-2">
        <Input
          type="text"
          placeholder="Search a character..."
          className="w-[30%]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default SearchBox;
