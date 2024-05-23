'use client'

import { useEffect, useState } from "react"

export default function SeqDisplay({ sequence, startsOpen }: { sequence: String, startsOpen: boolean }) {
    const [isOpen, setIsOpen] = useState(startsOpen);
    
    useEffect(() => {
        setIsOpen(startsOpen);
    }, [startsOpen]);
    
    return (
        <div className="outline outline-black p-1 my-1" onClick={() => {setIsOpen(!isOpen)}}>
            {!isOpen && <h1>{sequence.substring(0, 3)}... <span className="text-gray-400">minimized</span></h1>}
            {isOpen && <><h1>Sequence</h1> <hr className="text-gray-400" /><p>{sequence}</p></>}
        </div>
    )
}