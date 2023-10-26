import { useContext, useEffect, useMemo } from "react"
import { usePaginate } from "../../../hooks/usePaginate"
import { createTrip } from "../../../CreateTrip/context/CreateTrip"
import { useQueryParams } from "../../../hooks/useQueryParams"
import { useDataInputs } from "../../../hooks/useDataInputs"
import { InitialDataForm } from "../../../CreateTrip/models/ScheduleDay/types"
import { useConsult } from "../../../hooks/useConsult"
import { ListPaginate, TripType } from "../../../Models"

interface SelectDate {
    date: string
}

interface ErrSelectDate {
    date: string | null
}

const dateInitial: InitialDataForm<SelectDate, ErrSelectDate> = {
    inputs: {
        date: ""
    },
    errors: {
        date: null
    }
}

export function useLogic(){
    const { state, resetDataTrip, resetUrlDirectory } = useContext(createTrip)
    const { page, setPage, nextPage, prevPage } = usePaginate()
    const { getValueUrl } = useQueryParams()
    useMemo(() => {
        dateInitial.inputs.date = getValueUrl("date")
        if (state.scheduleDay !== "") {
            resetDataTrip()
            resetUrlDirectory()
        }
    }, [])
    const { data, addValueInput } = useDataInputs<SelectDate, ErrSelectDate>(dateInitial)
    const { resetAll, dataConsult, loading, fecthingData, codeState, mssg }
        = useConsult<null,ListPaginate<TripType>>(`trips-without-truck/${data.inputs.date}?page=${page}`)

    function addValueAndResetPage(value: string) {
        if (value == "") {
            resetAll()
        }
        addValueInput({ name: "date", value })
        setPage(1)
    }

    useEffect(() => {
        if (data.inputs.date !== "" || page > 1) {
            fecthingData()
        }
    }, [data.inputs.date, page])

    return {
        page,
        nextPage,
        prevPage,
        dataConsult,
        loading,
        codeState,
        mssg,
        addValueAndResetPage,
        inputDate:data.inputs.date
    }
}