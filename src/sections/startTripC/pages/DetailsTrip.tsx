import { useParams } from "react-router-dom";
import { decrypt } from "../../../service/encrypt";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useEffect, useMemo } from "react";
import { useModal } from "../../../hooks/useModal";
import { useConsult } from "../../../hooks/useConsult";
import { TripType } from "../../../Models";
import { Loading } from "../../../components/Loading";
import { Errors } from "../../../components/Errors";
import { ModalGeneric } from "../../../components/ModalGeneric";
import { ContentM } from "../components/ContentM";
import { TittleMajor } from "../../../components/TittleMajor";
import { Title } from "../../../components/Title";
import STARTTRIP from "../../../utils/startTrip.png";

export function DetailsTrip() {
  const { trip } = useParams();
  const tripDecrypt = decrypt(trip!);
  const { getValueUrl } = useQueryParams();
  const prevPage = useMemo(() => {
    return getValueUrl("page");
  }, []);
  const { modal, openModal, closeModal } = useModal();
  const { dataConsult, mssg, codeState, fecthingData, loading } = useConsult<
    null,
    TripType
  >(`trip/${tripDecrypt}`);

  //validando si el camion esta en otro viaje activo
  const {
    dataConsult: response,
    mssg: mssError,
    codeState: status,
    fecthingData: consult,
    loading: loadingConsult,
  } = useConsult(`truck-is-busy/${tripDecrypt}`);

  useEffect(() => {
    consult();
    fecthingData();
  }, []);

  if (loading || loading == null || loadingConsult || loadingConsult == null) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    return <Errors message={mssg} />;
  }
  if (status !== null && status !== 200) {
    return <Errors message={mssError} />;
  }
  return (
    <article className="space-y-[100px]">
      <ModalGeneric
        isOpen={modal}
        content={<ContentM closeModal={closeModal} trip={dataConsult!} />}
      />
      <TittleMajor text="Iniciar viajes" />
      <Title
        text="Detalles del viaje :"
        color="white"
        size="lg"
        to={`/trips-without-init/?page=${prevPage}`}
      />
      <section className="bg-white p-[50px] w-[85%] md:w-[60%] max-w-[500px] mx-auto rounded-xl">
        <section className="space-y-[30px]">
          <section className="w-fit mx-auto">
            <img className="w-[150px]" src={STARTTRIP} alt="" />
          </section>
          <section>
            {
              response === true && <p className="text-red-600">El camion tiene un viaje en proceso</p>
            }
            <div>
              <span className="font-bold">Dia del viaje: </span>
              {dataConsult?.scheduleDay}
            </div>
            <div>
              <span className="font-bold">ID: </span>
              {dataConsult !== null &&
                typeof dataConsult.user === "object" &&
                dataConsult?.user.id}
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

            <button
              className={`${
                dataConsult?.initialDateCompany !== null &&
                "opacity-60 pointer-events-none"
              } ${
                response === true && "opacity-60 pointer-events-none"
              } bg-[#2c8d42] rounded-md p-[5px] w-full mt-[30px] text-white font-semibold`}
              onClick={openModal}
            >
              Iniciar Viaje
            </button>
          </section>
        </section>
      </section>
    </article>
  );
}
