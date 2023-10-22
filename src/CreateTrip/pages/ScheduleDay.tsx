import { ChangeEvent, useContext } from "react"
import { createTrip } from "../context/CreateTrip"
import { TittleMajor } from "../../components/TittleMajor"
import { CustomInput } from "../../components/CustomInput"
import { useDataInputs } from "../../hooks/useDataInputs"
import { ErrForm, Form, InitialDataForm } from "../models/ScheduleDay/types"
import { DataContext } from "../models/types.d.all"


export function ScheduleDay() {
    const { state, addValueCont, clearValueKey,changeScheduleDay } = useContext(createTrip)

    const initialForm: InitialDataForm<Form, ErrForm> = {
        inputs: {
            scheduleDay: state.scheduleDay
        },
        errors: {
            scheduleDay: null
        }
    }
    const { data, addValueInput, addErrorInput } = useDataInputs(initialForm)

    function handlerChange(e:ChangeEvent<HTMLInputElement>):void {
        const { name , value } = e.target

    }

    return (
        <div className="bg-white max-w-[700px] w-[70%] mx-auto space-y-[25px] flex flex-col items-center py-[100px] rounded-2xl">
            <TittleMajor text={"Crear Viaje"} color="black" size="sm" />
            <div>
                <CustomInput


                />
            </div>
            <div
                className={`flex w-[70%] mx-auto justify-end ${(dataTrip.scheduleDay == "" || !dataTrip.scheduleDay) &&
                    "opacity-50 pointer-events-none"
                    }`}
            >
                <BtnContinue to={urlsDataTripSelected.customer} />
            </div>
        </div>
    )
}