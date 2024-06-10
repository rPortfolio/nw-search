// 'use client';
import prisma from '@/lib/prisma';
import { Sequence } from '@prisma/client';
import AddSeqPanel from '@/components/AddSeqPanel';
import SeqList from '@/components/SeqList';
import { searchResult } from './search/get-matches';

async function getPosts(): Promise<Array<Sequence>> {
  const posts: Array<Sequence> = await prisma.sequence.findMany();
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="">
      <AddSeqPanel />
      <SeqList
        results={posts.map((value: Sequence) => {
          let result: searchResult = { seq: value, i: -1 };
          return result;
        })}
      />
    </main>
  );
}
