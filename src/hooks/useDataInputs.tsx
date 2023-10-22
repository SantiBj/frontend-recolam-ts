import { useState } from "react"
import { AddErrorInput, InitialDataForm, ValueInputs } from "../CreateTrip/models/ScheduleDay/types"


export function useDataInputs<TInp, TErr>(dataInitial: InitialDataForm<TInp, TErr>) {
    const [data, setData] = useState<InitialDataForm<TInp, TErr>>(dataInitial)

    function addValueInput({ name, value }: ValueInputs) {
        setData({
            ...data,
            inputs: {
                ...data.inputs,
                [name]: value
            }
        })
    }

    const addErrorInput:AddErrorInput = (name, msg)=> {
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
        addErrorInput
    }


}