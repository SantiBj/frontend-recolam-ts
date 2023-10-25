import { useEffect } from "react"
import { useConsult } from "../../../hooks/useConsult"
import { CustomerType } from "../../models/customer/types"

export function useCustomer(idCustomer: string) {

    const { dataConsult:customer, codeState, mssg, loading, fecthingData } = useConsult<null,CustomerType>("customer/" + idCustomer)

    useEffect(()=>{
        fecthingData()
    },[])

    return {
        customer,
        loading,
        codeState
    }
}