'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Error from 'next/error';

export default function AddSeqPanel() {
  const [errMsg, setErrMsg] = useState('');
  const [seq, setContent] = useState('');
  const [seqName, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const result = await fetch('/api/add-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seq, seqName }),
      });

      if (result.status == 452) {
        setErrMsg('Cannot Add Sequence: Sequence Already Exists in Database');
        return;
      } else if (result.status == 412) {
        setErrMsg('Cannot Add Sequence: Contains Invalid Characters');
        return;
      }

      setErrMsg('');

      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setContent('');
    setName('');
  };

  return (
    <div className="border-2 border-gray-500 flex justify-center">
      <div>
        <h1 className="underline text-2xl block text-center">Add Post</h1>
        <form onSubmit={handleSubmit} className="">
          <div>
            <label htmlFor="content">Content:</label>
            <input
              type="seq"
              id="seq"
              value={seq}
              onChange={(e: any) => {
                setContent(e.target.value);
              }}
              required
              className="mt-1 border-b-2 border-cyan-800"
            />
          </div>
          <div>
            <label htmlFor="name">Sequence Name:</label>
            <input
              type="name"
              id="name"
              value={seqName}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
              required
              className="mt-1 border-b-2 border-cyan-800"
            />
          </div>
          <button type="submit" className="underline text-cyan-800 mb-1">
            Submit
          </button>
          <p>{errMsg}</p>
        </form>
      </div>
    </div>
  );
}
