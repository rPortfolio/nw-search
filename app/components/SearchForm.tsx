'use client';
import { Sequence } from "@prisma/client";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
    const [content, setContent] = useState('');

    const handleContentChange = (event: any) => {setContent(event.target.value);};

    const searchParams = useSearchParams();

    const handleSubmit = async () => {
        const params = new URLSearchParams(searchParams);
        params.set('query', content);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Sequence"></input>
            <button type="submit">Search</button>
        </form>
    )
}