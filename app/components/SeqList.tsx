'use client';
import { Sequence } from '@prisma/client';
import SeqDisplay from './SeqDisplay';
import { useEffect, useState } from 'react';
import { searchResult } from '@/search/get-matches';

function generateList(results: searchResult[], open: boolean) {
  return results.map((result: searchResult) => {
    return (
      <SeqDisplay
        key={result.seq.id}
        name={result.seq.seqName}
        sequence={result.seq.seq}
        identity={result.i}
        startsOpen={open}
      />
    );
  });
}

export default function SeqList({ results }: { results: searchResult[] }) {
  const [allOpen, setAllOpen] = useState(false);
  return (
    <div className="p-2">
      <hr></hr>
      <button
        onClick={() => {
          setAllOpen(!allOpen);
        }}
        className="text-blue-700 my-1 underline"
      >
        Toggle: {allOpen ? <span>Open</span> : <span>Closed</span>}
      </button>
      {generateList(results, allOpen)}
    </div>
  );
}
