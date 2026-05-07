import { useState, useTransition } from "react";

// const [data, setData] = useState([]);

// const handleSearch = async (query) => {
//     const res = await fetch(`/api/search?q=${query}`);
//     const result = await res.json();
//     setData(result); // blocks UI if heavy
// };
// without transition- ui blocks 
function Search() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleSearch = async (value) => {
        setQuery(value); // urgent update (typing stays smooth)

        const res = await fetch(`/api/search?q=${value}`);
        const result = await res.json();

        startTransition(() => {
            setData(result); // non-urgent update
        });
    };

    return (
        <>
            <input onChange={(e) => handleSearch(e.target.value)} />
            {isPending && <p>Loading...</p>}
            {data.map(item => <p key={item.id}>{item.name}</p>)}
        </>
    );
}
export default Search