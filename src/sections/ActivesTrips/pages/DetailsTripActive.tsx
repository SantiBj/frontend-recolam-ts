import { useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { decrypt } from "../../../service/encrypt"
import { useModal } from "../../../hooks/useModal"
import { useConsult } from "../../../hooks/useConsult"
import { Loading } from "../../../components/Loading"
import { Errors } from "../../../components/Errors"
import { ModalGeneric } from "../../../components/ModalGeneric"
import { TripType } from "../../../Models"
import { formaterDate } from "../../../service/formaterDate"
import { ContentM } from "../components/ContentM"

export function DetailsTripActive() {
    const { trip } = useParams()
    const tripDecrypt = useMemo(() => {
        decrypt(trip!)
    }, [])
    const { modal, closeModal, openModal } = useModal()
    const { dataConsult, codeState, mssg, fecthingData, loading } =
        useConsult<null,TripType>(`trip/${tripDecrypt}`)

    useEffect(()=>{
        fecthingData()
    },[])

    if (loading || loading == null) {
        return <Loading />;
      }
      if (codeState && codeState !== 200) {
        return <Errors message={mssg} />;
      }
    return (
        <article>
      <ModalGeneric
        isOpen={modal}
        content={<ContentM closeModal={closeModal} trip={dataConsult} />}
      />
      <section>
        <div>Dia del viaje = {dataConsult?.scheduleDay}</div>
        <div>Cliente = {typeof dataConsult?.user == "object" && dataConsult?.user.name}</div>
        <div>Camion = {dataConsult?.truck}</div>
        <div>Direccion = {dataConsult?.address}</div>
        <div>
          Fecha y hora salida empresa ={" "}
          {formaterDate(dataConsult?.initialDateCompany)}
        </div>
        {dataConsult?.initialDateCustomer !== null && (
          <div>
            Fecha y hora llegada cliente ={" "}
            {formaterDate(dataConsult?.initialDateCustomer)}
          </div>
        )}
        {dataConsult?.endDateCustomer !== null && (
          <div>
            Fecha y hora salida cliente ={" "}
            {formaterDate(dataConsult?.endDateCustomer)}
          </div>
        )}
      </section>
      <section>
        <button
        onClick={openModal}
          className={`${
            ((dataConsult?.endDateCustomer == null) ||
            (dataConsult?.endDateCompany == null)) &&
              "opacity-60 pointer-events-none"
          }`}
        >
          Finalizar viaje
        </button>
      </section>
    </article>
    )
}