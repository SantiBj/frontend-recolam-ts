import { ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { useDataInputs } from "../../../hooks/useDataInputs";
import { useAddAddress } from "../../hooks/confirmation/useAddAddress";
import { useCustomer } from "../../hooks/confirmation/useCustomer";
import { InitialDataForm } from "../../models/ScheduleDay/types";
import { ErrInputs, Inputs } from "../../models/confirmation/types";
import { AddValueCont } from "../../models/types.d.all";
import { DataState } from "../../models/types.d.all";
import { UrlsTrip } from "../../models/types.d.all";
import { addAddress } from "../../../service/addAddress";
import { Loading } from "../../../components/Loading";
import { CustomInput } from "../../../components/CustomInput";

interface Props {
    urlsTrip: UrlsTrip
    stateTrip: DataState
    addValueCont: AddValueCont
}


const initialData: InitialDataForm<Inputs, ErrInputs> = {
    inputs: {
        address: ""
    },
    errors: {
        address: null
    }
}


export function ContentCardsConf({ urlsTrip, stateTrip, addValueCont }: Props) {

    const { data, addValueInput, addErrorInput } = useDataInputs<Inputs, ErrInputs>(initialData)
    const { customer, loading } = useCustomer(stateTrip.user)
    useAddAddress(customer, addValueCont, addValueInput)

    function handlerChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target

        addAddress(
            value,
            addValueCont,
            addValueInput,
            addErrorInput,
            data.errors,
            stateTrip
        )
    }

    if (loading || loading == null) {
        return <Loading />
    }
    return (
        <div>
            <div className="flex justify-center gap-[20px] items-center bg-white">
                <Link to={urlsTrip.scheduleDay} className="bg-white transition-all hover:scale-105 p-[10px] rounded-md">
                    {`Dia del viaje ${stateTrip.scheduleDay}`}
                </Link>
                <Link to={urlsTrip.customer}>
                    <div
                        className={`hover:scale-105 transition-all rounded-lg box-border w-[250px] h-[240px] p-[20px] overflow-y-auto bg-white`}
                    >
                        <img
                            src="https://n9.cl/recolam"
                            alt="cliente"
                            className="w-[100px] bg-slate-300 h-[100px] mx-auto mb-[20px]"
                        />
                        <p>
                            <span className="font-semibold">ID :</span> {customer?.id}
                        </p>
                        <p>
                            <span className="font-semibold">Nombre :</span> {customer?.name}
                        </p>
                        <p>
                            <span className="font-semibold">N° tel :</span>{" "}
                            {customer?.numberPhone}
                        </p>
                    </div>
                </Link>
                <Link to={urlsTrip.truck}>
                    <div className="bg-[#E6E6E6] w-[150px] p-[15px] rounded-lg space-y-[10px] transition-all hover:scale-105">
                        <img
                            src="https://acortar.link/WA1HsO"
                            className="w-[100px] mx-auto"
                            alt=""
                        />
                        <p className="text-center font-semibold">{stateTrip.truck}</p>
                    </div>
                </Link>
            </div>

            <CustomInput
                type={"text"}
                placeholder={"Direccion :"}
                onChange={handlerChange}
                value={data.inputs.address}
                name={"address"}
                error={data.errors.address}
            />
        </div>
    )
}