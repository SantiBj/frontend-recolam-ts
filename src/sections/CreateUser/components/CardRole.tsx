import { TbTruckDelivery, } from "react-icons/tb"
import { Link } from "react-router-dom"
import { RoleType } from "../models/types"
import roleCustomer from "../../../utils/rol-user.png"
import roleAdmin from "../../../utils/rol-admin.png"

interface Props {
    role:RoleType
    to:string
}

export function CardRole({ role,to }:Props){
    return(
        <Link to={to}>
      <section className="bg-gray-200 w-fit shadow-lg p-[45px] rounded-lg hover:scale-105 transition-all">
        <div className="flex flex-col justify-center items-center gap-[5px]">
          {role == "truck" && (
            <>
              <div className="text-green-600">
                <TbTruckDelivery size={40} />
              </div>
              <div>Camión</div>
            </>
          )}
          {role == "customer" && (
            <>
              <div>
                <img
                  src={roleCustomer}
                  className="w-[40px]"
                  alt=""
                />
              </div>
              <div>Cliente</div>
            </>
          )}
          {role == "admin" && (
            <>
              <div>
                <img
                  src={roleAdmin}
                  className="w-[40px]"
                  alt=""
                />
              </div>
              <div>Admin</div>
            </>
          )}
        </div>
      </section>
    </Link>
    )
}