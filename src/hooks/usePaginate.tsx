import { useState } from "react";

export function usePaginate(initialPagination:number=1){
    const [page,setPage] = useState(initialPagination)

    function nextPage(){
        setPage(page+1)
    }

    function prevPage(){
        setPage(page-1)
    }

    return{
        page,
        setPage,
        nextPage,
        prevPage
    }
}