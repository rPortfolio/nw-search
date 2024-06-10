'use client';
import { Sequence } from '@prisma/client';
import { FormEvent, useState } from 'react';
import { search, searchResult } from './get-matches';
import SeqList from '@/components/SeqList';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<searchResult> | null>([]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!search) {
      setResults([]);
      return;
    }
    setResults(null);
    const data: Array<searchResult> = await search(query);
    console.log(data);
    setResults(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {results && results.length > 0 && <SeqList results={results} />}
      {results && results.length == 0 && <p>No Results</p>}
      {results == null && <p>Loading</p>}
    </>
  );
}
