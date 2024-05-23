'use server';

import prisma from "@/lib/prisma";
import { Sequence } from "@prisma/client";

export default async function GETCONTAINS(contains: string): Promise<Array<Sequence>> {
    return await prisma.sequence.findMany({
        where: {
            seq : {
                contains: contains
            }
        }
    });
}