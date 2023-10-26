import { useContext, useMemo } from "react";
import { usePaginate } from "../../hooks/usePaginate";
import { useQueryParams } from "../../hooks/useQueryParams";
import { createTrip } from "../../CreateTrip/context/CreateTrip";
import { useDataInputs } from "../../hooks/useDataInputs";



export function ListTruckAvailable(){
    const { state,resetDataTrip,resetUrlDirectory } = useContext(createTrip)
    const { page,setPage,nextPage,prevPage } = usePaginate()
    const { getValueUrl }= useQueryParams()
    const initialDate = useMemo(()=>{
        return getValueUrl("date")
    },[])
    const {} = useDataInputs()


}