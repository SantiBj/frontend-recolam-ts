import { useState } from "react"
import { InitialDataForm, ValueInputs } from "../CreateTrip/models/ScheduleDay/types"


export function useDataInputs<TInp, TErr>(dataInitial: InitialDataForm<TInp, TErr>) {
    const [data, setData] = useState<InitialDataForm<TInp, TErr>>(dataInitial)

    function addValueInput({ name, value }: ValueInputs) {
        setData({
            ...data,
            [name]: value
        })
    }

    function addError(name: string, msg: string) {
        setData({
            ...data,
            errors: {
                ...dataInitial.errors,
                [name]: msg
            }
        })
    }

    return {
        data,
        addValueInput,
        addError
    }


}