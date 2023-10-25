import { useEffect } from "react"
import { AddValueInput } from "../../models/ScheduleDay/types";
import { CustomerType } from "../../models/customer/types";
import { AddValueCont } from "../../models/types.d.all";


export function useAddAddress(customer: CustomerType | null, addValueCont: AddValueCont, addValueInput: AddValueInput) {
    useEffect(() => {
        if (customer !== null) {
            addValueCont("address", customer.address)
            addValueInput({ name: "address", value: customer.address })
        }
    }, [customer])
}