'use client';

import { useEffect, useState } from 'react';

export default function SeqDisplay({
  name,
  sequence,
  identity,
  startsOpen,
}: {
  name: string;
  sequence: string;
  identity: number;
  startsOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(startsOpen);

  useEffect(() => {
    setIsOpen(startsOpen);
  }, [startsOpen]);

  return (
    <div
      className="border-t-2 border-cyan-700 p-1 my-1"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {/* {!isOpen && (
        <h1>
          {sequence.substring(0, 7)}
          {sequence.length > 7 && '...'}{' '}
          <span className="text-gray-400">minimized</span>
        </h1>
      )} */}
      <h1 className="text-xl">
        {name} <span className="text-gray-400">minimized</span>
      </h1>
      {isOpen && (
        <>
          <p>{sequence}</p>
          <hr className="text-gray-400" />
          {identity != -1 && <p>Identity: {identity}</p>}
        </>
      )}
    </div>
  );
}
