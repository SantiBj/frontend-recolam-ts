import { useContext } from "react"
import { createTrip } from "../context/CreateTrip"
import { Navigate } from "react-router-dom"
import { TittleMajor } from "../../components/TittleMajor"
import { Title } from "../../components/Title"
import { ContentCardsTruck } from "../components/truck/ContentCardsTruck"
import { TbTruckOff } from "react-icons/tb";


export function Truck() {

  const { state, addValueCont, urlsTrip, addUrlDirectory } = useContext(createTrip)

  function onClick(){
    addValueCont("truck","")
  }

  if (state.user === "") {
    return <Navigate to={urlsTrip.customer} />
  }
  return (
    <div className="transition-all">
      <div className="space-y-[30px]">
        <TittleMajor text={"Crear Viaje"} />
        <Title
          to={urlsTrip.customer}
          text={`Lista de camiones con menos de 3 viajes para el  ${state.scheduleDay}`}
        />
      </div>
      <section>
        { state.truck !== "" &&
        <section onClick={onClick} className="bg-white mt-[100px] w-fit p-[10px] rounded-xl flex items-center gap-[5px]">
          <span className="text-blue-500">
            <TbTruckOff size={20} />
          </span>
          <p>Viaje sin camion</p>
        </section>
      }
      <div className={`space-y-[70px] ${state.truck =="" ? "mt-[100px]": "mt-[30px]"}`}>
        <ContentCardsTruck
          addUrlDirectory={addUrlDirectory}
          truckSelected={state}
          addValue={addValueCont}
          newDateTrip={state.scheduleDay}
          isCreate
        />
      </div>
      </section>
      
    </div>
  )
}