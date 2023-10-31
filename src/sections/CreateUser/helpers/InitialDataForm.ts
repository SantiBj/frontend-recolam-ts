import { InitialDataForm } from "../../../CreateTrip/models/ScheduleDay/types"
import { DataFormType, ErrFormType } from "../models/types"

const initialDtaForm: DataFormType = {
    id: "",
    name: "",
    address: "",
    numberPhone: "",
    role: "",
}

const errorsDtaForm: ErrFormType = {
    id: null,
    name: null,
    address: null,
    numberPhone: null
}

export const initialDataUser: InitialDataForm<DataFormType, ErrFormType> = {
    inputs: initialDtaForm,
    errors: errorsDtaForm
}