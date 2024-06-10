'use server';

import prisma from '@/lib/prisma';
import { Sequence } from '@prisma/client';
import { generateGrid, traceback } from './nw-functions';

const bonus = 1;
const penalty = 1;

function get_alignment(query: String, subject: String) {
  let grid: Array<Array<number>> = [];
  for (let i = 0; i < query.length; i++) {
    let row: Array<number> = [];
    for (let j = 0; j < query.length; j++) {
      row.push(j * -penalty);
    }
  }
}

export default async function GETCONTAINS(
  contains: string
): Promise<Array<Sequence>> {
  const sequences: Array<Sequence> = await prisma.sequence.findMany({
    where: {
      seq: {
        contains: contains,
      },
    },
  });
  sequences.sort((a, b) => {
    return a.seq.length - b.seq.length;
  });
  return sequences;
}

export type searchResult = {
  seq: Sequence;
  i: number;
};

async function addMatch(
  queryids: string[],
  subjectid: string,
  identity: number
) {
  for (let i = 0; i < queryids.length; i++) {
    prisma.match.create({
      data: {
        queryid: queryids[i],
        subjectid: subjectid,
        identity: identity,
      },
    });
  }
}

export async function search(query: string): Promise<searchResult[]> {
  const results: searchResult[] = [];
  const sequences: Array<Sequence> = await prisma.sequence.findMany();
  for (let i = 0; i < sequences.length; i++) {
    let seq = sequences[i];
    let tb = traceback(
      generateGrid(query.toUpperCase(), seq.seq),
      [],
      query.toUpperCase(),
      seq.seq
    ).length;
    let identity = ((2 * tb) / (seq.seq.length + query.length)) * 100;
    console.log(tb);
    let result: searchResult = {
      seq,
      i: identity,
    };
    let queries: Sequence[] = await prisma.sequence.findMany({
      where: { seq: { equals: query } },
    });
    addMatch(
      queries.map((e) => {
        return e.id;
      }),
      seq.id,
      identity
    );
    results.push(result);
  }
  results.sort((a: searchResult, b: searchResult) => {
    return b.i - a.i;
  });
  return results;
}
