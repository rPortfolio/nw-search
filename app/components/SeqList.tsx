'use client';
import { Sequence } from "@prisma/client";
import SeqDisplay from "./SeqDisplay";
import { useEffect, useState } from "react";


function generateList(sequences: Sequence[], open: boolean) {
    return sequences.map( (post: Sequence) => {
        return (
            <SeqDisplay key={post.id} sequence={post.seq} startsOpen={open} />
        )
    })
}


export default function SeqList({sequences}: {sequences: Sequence[]}) {
    const [allOpen, setAllOpen] = useState(false);
    return (
        <div className="p-2">
            <hr></hr>
            <button onClick={() => {setAllOpen(!allOpen)}} className="text-blue-700 my-1 underline">Toggle: {allOpen ? <span>Open</span> : <span>Closed</span>}</button>
            {
                generateList(sequences, allOpen)
            }
        </div>
    )
}