import { InitialDataForm } from "../../../CreateTrip/models/ScheduleDay/types"
import { DataFormType, ErrFormType } from "../models/types"

const initialDtaForm: DataFormType = {
    document: "",
    name: "",
    address: "",
    numberPhone: "",
    isAdmin: false,
}

const errorsDtaForm: ErrFormType = {
    document: null,
    name: null,
    address: null,
    numberPhone: null
}

export const initialDataUser: InitialDataForm<DataFormType, ErrFormType> = {
    inputs: initialDtaForm,
    errors: errorsDtaForm
}