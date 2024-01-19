import { AddCustomer, CustomerType } from "../../models/customer/types"
import { DataState } from "../../models/types.d.all"
import { AiOutlineCheckCircle } from "react-icons/ai"
import CUSTOMER from "../../../utils/building.png"

interface Props {
    customer:CustomerType
    stateTrip:DataState
    addCustomer:AddCustomer,
    quantityTrips:number
}

export function CardCustomer({customer,stateTrip,addCustomer,quantityTrips}:Props){
    return (
        <div
      className={`${
        customer.document == stateTrip.user &&
        "border-[2px] rounded-lg border-green-600 p-[5px]"
      }`}
    >
      <div className={`hover:scale-105 rounded-lg box-border w-[250px] h-[240px] p-[20px] overflow-y-auto bg-white`}>
        <label className="relative" key={customer.document} htmlFor={customer.document}>
          <input
            className="opacity-0"
            onChange={addCustomer}
            data-quantity={quantityTrips}
            type="radio"
            name="user"
            value={customer.document}
            id={customer.document}
          ></input>
          <div className={`${customer.document != stateTrip.user && "hidden"} absolute top-0 text-green-600`}>
            <AiOutlineCheckCircle  size={25}/>
          </div>
          <img
            src={CUSTOMER}
            alt="cliente"
            className="w-[100px] h-[100px] mx-auto mb-[20px]"
          />
          <p>
            <span className="font-semibold">Documento :</span> {customer.document}
          </p>
          <p>
            <span className="font-semibold">Nombre :</span> {customer.name}
          </p>
          <p>
            <span className="font-semibold">N° tel :</span>{" "}
            {customer.numberPhone}
          </p>
        </label>
      </div>
    </div>
    )
}