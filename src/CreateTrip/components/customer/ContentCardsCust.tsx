import { useMemo } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { AddUrlDirectory } from "../../models/types.all";
import { DataState } from "../../models/types.all";
import { AddValueCont } from "../../models/types.all";
import { usePaginate } from "../../../hooks/usePaginate";

interface Props {
    addValueCont: AddValueCont
    state: DataState
    addUrlDirectory: AddUrlDirectory
}

export function ContentCardsCust({ addValueCont, state, addUrlDirectory }: Props) {

    const {
        addValueUrl,
        getValueUrl
    } = useQueryParams()

    const initialPagination: number = useMemo(() => {
        const pagination = getValueUrl("page")
        if (pagination == "") {
            return 1
        }
        return parseInt(pagination)
    }, [])

    const { page, nextPage, prevPage } = usePaginate(initialPagination)
    
    return (

    )
}