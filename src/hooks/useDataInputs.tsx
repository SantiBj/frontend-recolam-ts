import { useState } from "react"
import { AddErrorInput, InitialDataForm, ValueInputs } from "../CreateTrip/models/ScheduleDay/types"


export function useDataInputs<TInp, TErr>(dataInitial: InitialDataForm<TInp, TErr>) {
    const [data, setData] = useState<InitialDataForm<TInp, TErr>>(dataInitial)

    function addValueInput({ name, value }: ValueInputs): void {
        const template = {
            ...data,
            inputs: {
                ...data.inputs,
                [name]: value
            }
        }
        setData(template)
    }

    // se utiliza funcion para usar el estado mas reciente y no el antiguo
    // ya que puede ocurrir que la momento de usar addError el estado no este actualizado
    // y se use por ende el antiguo

    const addErrorInput: AddErrorInput = (name, msg) => {
        setData(prevData => ({
            ...prevData,
            errors: {
                ...prevData.errors,
                [name]: msg
            }
        }));
    }

    return {
        data,
        addValueInput,
        addErrorInput
    }


}