import { AiOutlineCheckCircle } from "react-icons/ai"
import { AddTruck, TruckType } from "../CreateTrip/models/truck/types"
import { DataState } from "../CreateTrip/models/types.d.all"
import NHR from "../utils/nhr.png"

interface Props {
    addTruck?: AddTruck,
    truck: TruckType,
    stateTrip?: DataState | { truck: string }
}

export function CardTruck({ addTruck, truck, stateTrip }: Props) {

    const onChange = (placa: string) => () => {
        addTruck!(placa)
    }
    return (
        <div
            className={`${stateTrip?.truck === truck.placa &&
                "border-[2px] rounded-lg border-green-600 p-[5px] w-fit"
                }`}
        >
            <div className="bg-[#E6E6E6] w-[150px] p-[15px] rounded-lg space-y-[10px] transition-all hover:scale-105">
                <label className="relative" key={truck.placa} htmlFor={truck.placa}>
                    <input
                        className="opacity-0"
                        onClick={onChange(truck.placa)}
                        type="radio"
                        name="truck"
                        id={truck.placa}
                        value={truck.placa}
                    />
                    <div className={`${stateTrip!.truck !== truck.placa && "hidden"} absolute top-0 text-green-600`}>
                        <AiOutlineCheckCircle size={25} />
                    </div>
                    <img
                        src={NHR}
                        className="w-[100px] mx-auto"
                        alt=""
                    />
                    <p className="text-center font-semibold">{truck.placa}</p>
                </label>
            </div>
        </div>
    )
}