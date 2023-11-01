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
import SCHEDULE from "../../../utils/scheduleDay.png"
import CUSTOMER from "../../../utils/building.png"
import NHR from "../../../utils/nhr.png"

interface Props {
    openModal:()=>void
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


export function ContentCardsConf({ openModal,urlsTrip, stateTrip, addValueCont }: Props) {

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
            <div className="flex flex-col w-[50%] max-w-[500px] mx-auto rounded-xl gap-[5px] bg-white">
                <Link to={urlsTrip.scheduleDay} className="hover:bg-gray-200 rounded-t-xl transition-all flex items-center gap-[10px] p-[10px] border-[1px]">
                   <section> 
                        <img src={SCHEDULE} className="w-[60px] h-[50px]" alt="" />
                   </section>
                    <section>
                    <span className="font-bold">Fecha del viaje : </span>{stateTrip.scheduleDay}
                        </section>

                </Link>
                <Link to={urlsTrip.customer} className="hover:bg-gray-200 transition-all flex items-center gap-[10px] p-[10px] border-[1px]">
                <section> 
                        <img src={CUSTOMER} className="w-[60px] h-[50px]" alt="" />
                   </section>
                    <section className=" capitalize">
                    <span className="font-bold">Cliente : </span>{customer?.id} / {customer?.name}
                    </section>
                
                </Link>
                <Link to={urlsTrip.truck} className="hover:bg-gray-200 transition-all flex items-center gap-[10px] p-[10px] border-[1px]">
                <section> 
                        <img src={NHR} className="w-[65px] h-[50px]" alt="" />
                   </section>
                    <section className=" capitalize">
                    <span className="font-bold">Camión: </span>{stateTrip.truck}
                    </section>
                
                </Link>
                <CustomInput
                type={"text"}
                placeholder={"Direccion :"}
                onChange={handlerChange}
                value={data.inputs.address}
                name={"address"}
                error={data.errors.address}
            />
            <button
                onClick={openModal}
                className={`bg-[#2c8d42] text-white ${stateTrip.address === ""
                    ? "opacity-60 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                    } py-[10px] px-[12px] rounded-b-xl`}
            >
                Crear Viaje
            </button> 
            </div>

            
        </div>
    )
}