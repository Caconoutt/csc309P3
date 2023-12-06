import { useState, useEffect } from "react";
// import Table from "./Table";

function PetSearch() {
    const [query, setQuery] = useState({search: "", page: 1, });
    const [totalPages, setTotalPages] = useState(1);
    const [ players, setPlayers ] = useState([]);

    useEffect(() => {
        const {search, page} = query;
        fetch(`PetSearch/?search=${search}&page=${page}`)
        .then(response => response.json())
        .then(json => {
            setPlayers(json.data);
            setTotalPages(json.meta.total_pages);
        });
    }, [query]);

    return <>
    
    </>;
}

export default Players;