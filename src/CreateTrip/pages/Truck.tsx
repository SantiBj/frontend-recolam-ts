import { useContext } from "react"
import { createTrip } from "../context/CreateTrip"
import { Navigate } from "react-router-dom"
import { TittleMajor } from "../../components/TittleMajor"
import { Title } from "../../components/Title"
import { BtnContinue } from "../components/scheduleDay/BtnContinue"
import { ContentCardsTruck } from "../components/truck/ContentCardsTruck"

export function Truck(){

    const { state,addValueCont,urlsTrip,addUrlDirectory } = useContext(createTrip)


    if(state.user === ""){
        return <Navigate to={urlsTrip.customer}/>
    }
    return(
        <div>
      <div className="space-y-[30px]">
        <TittleMajor text={"Crear Viaje"} />
        <Title
          to={urlsTrip.customer}
          text={`Lista de camiones con menos de 3 viajes para el  ${state.scheduleDay}`}
        />
      </div>
      <div className="space-y-[70px] mt-[100px]">
        <ContentCardsTruck
          addUrlDirectory={addUrlDirectory}
          truckSelected={state}
          addValue={addValueCont}
          newDateTrip={state.scheduleDay}
          isCreate
        />
        <div className="w-full flex justify-end">
          <BtnContinue to={"/create-trip/confirmation"} />
        </div>
      </div>
    </div>
    )
}