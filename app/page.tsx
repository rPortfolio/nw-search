import prisma from '@/lib/prisma';
import { Sequence } from '@prisma/client';
import AddSeqPanel from './components/AddSeqPanel';
import SeqList from './components/SeqList';

async function getPosts(): Promise<Array<Sequence>> {
  const posts: Array<Sequence> = await prisma.sequence.findMany();
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="">
      <AddSeqPanel />
      <SeqList sequences={posts} />
    </main>
  );
}
