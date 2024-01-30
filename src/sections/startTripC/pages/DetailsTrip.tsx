import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { decrypt } from "../../../service/encrypt";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useEffect, useMemo, useRef } from "react";
import { useModal } from "../../../hooks/useModal";
import { useConsult } from "../../../hooks/useConsult";
import { TripType } from "../../../Models";
import { Loading } from "../../../components/Loading";
import { Errors } from "../../../components/Errors";
import { ModalGeneric } from "../../../components/ModalGeneric";
import { ContentM } from "../components/ContentM";
import { TittleMajor } from "../../../components/TittleMajor";
import { Title } from "../../../components/Title";
import { Link } from "react-router-dom";
import { Actions } from "../../trips/models/types";



export function DetailsTrip() {
  const { trip } = useParams();
  const tripDecrypt = decrypt(trip!);
  const { getValueUrl } = useQueryParams();
  const prevPage = useMemo(() => {
    return getValueUrl("page");
  }, []);
  const { modal, openModal, closeModal } = useModal();

  const actionModal = useRef<Actions>("START")

  function openM(action:Actions){
    actionModal.current = action === "START" ? "START" : action 
    openModal()
  }

  const { dataConsult, mssg, codeState, fecthingData, loading } = useConsult<
    null,
    TripType
  >(`trip/${tripDecrypt}`);

  useEffect(() => {
    fecthingData();
  }, []);

  if (loading || loading === null) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    return <Errors message={mssg} />;
  }
  return (
    <article className="space-y-[100px]">
      <ModalGeneric
        isOpen={modal}
        content={<ContentM closeModal={closeModal} action={actionModal.current} trip={dataConsult!} />}
      /> 
      <TittleMajor text="Iniciar viajes" />
      <Title
        text="Detalles del viaje :"
        color="white"
        size="lg"
        to={`/trips/not-actives?page=${prevPage}`}
      />
      <section className="bg-white p-[50px] w-[85%] md:w-[60%] max-w-[500px] mx-auto rounded-xl">
        <div className="flex justify-between">
          <Link to={`/trip-edit/${trip}`} title="Editar Viaje" className="transition-all hover:scale-125 hover:opacity-70 cursor-pointer">
            <CiEdit size={30} />
          </Link>
          <div onClick={()=>openM("DELETE")} title="Eliminar Viaje" className="text-red-500 transition-all hover:scale-125 hover:opacity-70 cursor-pointer">
            <AiTwotoneDelete size={30} />
          </div>
        </div>
        <section className="space-y-[30px]">
          <section className="w-full flex flex-col items-center" >
            <img
              className={`w-[150px] ${dataConsult?.truckBusy && "opacity-60"}`}
              src="https://i0.wp.com/tachpro.com/wp-content/uploads/drivers-hours-logo-blue.png?resize=287%2C284&ssl=1"
              alt=""
            />
            {dataConsult?.truckBusy && (
              <p className="text-red-600 text-center">
                El camion se encuentra realizando otro viaje, espera que llegue.
              </p>
            )}
          </section>
          <section>
            
            <div>
              <span className="font-bold">Dia del viaje: </span>
              {dataConsult?.scheduleDay}
            </div>
            <div>
              <span className="font-bold">Documento: </span>
              {dataConsult !== null &&
                typeof dataConsult.user === "object" &&
                dataConsult?.user.document}
            </div>
            <div>
              <span className="font-bold">Cliente: </span>
              {dataConsult !== null &&
                typeof dataConsult.user === "object" &&
                dataConsult?.user.name}
            </div>
            <div>
              <span className="font-bold">Camion: </span>

              {dataConsult?.truck}
            </div>

            <div>
              <span className="font-bold">Direccion: </span>
              {dataConsult?.address}
            </div>

            <div className="space-y-[8px] mt-[30px]">
              <button
                className={`${
                  dataConsult?.initialDateCompany !== null &&
                  "opacity-60 pointer-events-none"
                } ${
                  dataConsult?.truckBusy && "opacity-60 pointer-events-none"
                } bg-[#2c8d42] transition-all hover:opacity-70 rounded-md p-[5px] w-full text-white font-semibold`}
                onClick={()=>openM("START")}
              >
                Iniciar Viaje
              </button>
              <button
                className={`${
                  dataConsult?.initialDateCompany !== null || dataConsult.canceledDate &&
                  "opacity-60 pointer-events-none"
                } bg-red-500 transition-all hover:opacity-70 rounded-md p-[5px] w-full text-white font-semibold`}
                onClick={()=>openM("CANCEL")}
              >
                Cancelar Viaje
              </button>
            </div>
          </section>
        </section>
      </section>
    </article>
  );
}
