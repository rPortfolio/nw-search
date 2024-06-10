import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: any): Promise<NextResponse> {
  const res = await request.json();
  const { seq, seqName } = res;
  for (let i = 0; i < seq.length; i++) {
    if ('ATGC'.indexOf(seq[i]) < 0) {
      return NextResponse.json({ data: res }, { status: 412 });
    }
  }
  const check = await prisma.sequence.findMany({
    where: {
      seq: {
        equals: seq,
      },
    },
  });
  if (check.length > 0) {
    return NextResponse.json({ data: res }, { status: 452 });
  }
  const result = await prisma.sequence.create({
    data: {
      seq,
      seqName,
    },
  });
  console.log(result);
  return NextResponse.json({ data: res }, { status: 200 });
}
