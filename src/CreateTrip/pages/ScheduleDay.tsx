import { ChangeEvent, useContext } from "react"
import { createTrip } from "../context/CreateTrip"
import { TittleMajor } from "../../components/TittleMajor"
import { CustomInput } from "../../components/CustomInput"
import { useDataInputs } from "../../hooks/useDataInputs"
import { ErrForm, Form, InitialDataForm } from "../models/ScheduleDay/types"
import { BtnContinue } from "../components/scheduleDay/BtnContinue"



export function ScheduleDay() {
    const { state, changeScheduleDay,urlsTrip } = useContext(createTrip)

    const initialForm: InitialDataForm<Form, ErrForm> = {
        inputs: {
            scheduleDay: state.scheduleDay
        },
        errors: {
            scheduleDay: null
        }
    }
    const { data, addValueInput, addErrorInput } = useDataInputs(initialForm)

    function handlerChange(e: ChangeEvent<HTMLInputElement>): void {
        addValueInput(e.target)
        changeScheduleDay(e.target.value, addErrorInput)
    }

    return (
        <div className="bg-white max-w-[700px] w-[70%] mx-auto space-y-[25px] flex flex-col items-center py-[100px] rounded-2xl">
            <TittleMajor text={"Crear Viaje"} color="black" size="sm" />
            <div>
                <CustomInput
                    type="date"
                    placeholder="Fecha del viaje"
                    onChange={handlerChange}
                    value={data.inputs.scheduleDay}
                    name="scheduleDay"
                    error={data.errors.scheduleDay}
                />
            </div>
            <div
                className={`flex w-[70%] mx-auto justify-end ${(state.scheduleDay == "" || !state.scheduleDay) &&
                    "opacity-50 pointer-events-none"
                    }`}
            >
                <BtnContinue to={urlsTrip.customer} />
            </div>
        </div>
    )
}