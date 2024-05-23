'use client';
import { Sequence } from '@prisma/client';
import { FormEvent, useState } from 'react';
import GETCONTAINS from './get-matches';
import SeqList from '../components/SeqList';

export default function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Array<Sequence> | null>([]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!search) {
      setResults([]);
      return;
    }
    setResults(null);
    const data: Array<Sequence> = await GETCONTAINS(search);
    console.log(data);
    setResults(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
      {results && results.length > 0 && <SeqList sequences={results} />}
      {results && results.length == 0 && <p>No Results</p>}
      {results == null && <p>Loading</p>}
    </>
  );
}
