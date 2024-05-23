'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Error from 'next/error';

export default function AddSeqPanel() {
  const [errMsg, setErrMsg] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const result = await fetch('/api/add-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seq: content }),
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
  };

  return (
    <div>
      <h1 className="underline text-4xl">Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Content:</label>
          <input
            type="content"
            id="content"
            value={content}
            onChange={(e: any) => {
              setContent(e.target.value);
            }}
            required
            className="mt-1 outline outline-gray-400"
          />
        </div>
        <button type="submit" className="underline text-blue-700 mb-1">
          Submit
        </button>
        <p>{errMsg}</p>
      </form>
    </div>
  );
}
