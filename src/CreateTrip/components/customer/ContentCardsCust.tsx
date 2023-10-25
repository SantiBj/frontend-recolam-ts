import { ChangeEvent, useEffect, useMemo } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { AddUrlDirectory } from "../../models/types.all";
import { DataState } from "../../models/types.all";
import { AddValueCont } from "../../models/types.all";
import { usePaginate } from "../../../hooks/usePaginate";
import { useConsult } from "../../../hooks/useConsult";
import { CardCustomer } from "./CardCustomer";
import { AddCustomer,CustomerType } from "../../models/customer/types";
import { ListPaginate } from "../../../Models";
import { Pagination } from "../../../components/Pagination";


interface Props {
    addValueCont: AddValueCont
    state: DataState
    addUrlDirectory: AddUrlDirectory
}

export function ContentCardsCust({ addValueCont, state, addUrlDirectory }: Props) {

    const { addValueUrl, getValueUrl } = useQueryParams()

    const initialPagination: number = useMemo(() => {
        const pagination = getValueUrl("page")
        if (pagination == "") {
            return 1
        }
        return parseInt(pagination)
    }, [])

    const { page, nextPage, prevPage } = usePaginate(initialPagination)
    const { fecthingData, dataConsult, codeState, mssg, loading } = useConsult<_, ListPaginate<CustomerType>>(`customers/${state.scheduleDay}?page=${page}`)

    useEffect(() => {
        fecthingData()
    }, [page])

    const addCustomer:AddCustomer = (e)=>{
        const { name, value }: { name: string, value: string } = e.target
        addValueCont(name, value)
        addValueUrl("/create-trip/customer", "page", page)
        addUrlDirectory("customer", `/create-trip/customer?page=${page}`)
    }

    return (
        <>
            <div className="grid justify-items-center gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full">
                {dataConsult?.results.map((customer) => (
                    <CardCustomer
                        key={customer.id}
                        customer={customer}
                        stateTrip={state}
                        addCustomer={addCustomer}
                    />
                ))}
            </div>
            <Pagination
                dataConsult={dataConsult}
                page={page}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </>
    )
}