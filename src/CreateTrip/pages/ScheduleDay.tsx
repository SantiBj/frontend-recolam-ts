import React from "react"
import { useDataInputs } from "../../hooks/useDataInputs"
import { ErrForm, Form, InitialDataForm } from "../models/ScheduleDay/types"


const initialData: InitialDataForm<Form, ErrForm> = {
    inputs: {
        scheduleDay: ""
    },
    errors: {
        scheduleDay: null
    }
}

export function ScheduleDay() {
    const {
        data,
        addValueInput,
        addError
    } = useDataInputs<Form, ErrForm>(initialData)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        if (value.trim().length == 0) {
            addError(name, "Campo requerido")
            return
        }
        addValueInput(e.target)
    }

    return (
        <div>
            <input className="border-black border-[2px] border-solid" type="text" onChange={handleChange} name="scheduleDay" value={data.inputs.scheduleDay} />
        </div>
    )
}