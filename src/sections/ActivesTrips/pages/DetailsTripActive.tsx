import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { decrypt } from "../../../service/encrypt";
import { useModal } from "../../../hooks/useModal";
import { useConsult } from "../../../hooks/useConsult";
import { Loading } from "../../../components/Loading";
import { Errors } from "../../../components/Errors";
import { ModalGeneric } from "../../../components/ModalGeneric";
import { TripType } from "../../../Models";
import { formaterDate } from "../../../service/formaterDate";
import { ContentM } from "../components/ContentM";
import { Title } from "../../../components/Title";
import { TittleMajor } from "../../../components/TittleMajor";
import { StateTrip } from "../../../components/StateTrip";

export function DetailsTripActive() {
  const { trip } = useParams();
  const tripDecrypt = useMemo(() => {
    return decrypt(trip!);
  }, []);
  const { modal, closeModal, openModal } = useModal();
  const { dataConsult, codeState, mssg, fecthingData, loading } = useConsult<
    null,
    TripType
  >(`trip/${tripDecrypt}`);

  useEffect(() => {
    fecthingData();
    console.log(dataConsult);
  }, []);

  if (loading || loading == null) {
    return <Loading />;
  }
  if (codeState && codeState !== 200) {
    return <Errors message={mssg} />;
  }
  return (
    <article className="space-y-[150px]">
      <div className="space-y-[15px]">
        <TittleMajor text="Viajes activos" />
        <Title
          text="Detalles del viaje"
          color="white"
          size="lg"
          to="/trip-actives"
        />
      </div>
      <ModalGeneric
        isOpen={modal}
        content={<ContentM closeModal={closeModal} trip={dataConsult} />}
      />
      <section className="bg-white p-[50px] w-[85%] md:w-[60%] max-w-[500px] mx-auto rounded-xl">
        <section className="flex justify-center items-center mb-[50px]">
          <StateTrip idTrip={tripDecrypt} />
        </section>
        <section className="space-y-[30px] w-fit mx-auto">
          <section>
            <div>
              <span className="font-bold">Dia del viaje : </span>
              {dataConsult?.scheduleDay}
            </div>
            <div>
              <span className="font-bold">ID : </span>
              {typeof dataConsult?.user == "object" && dataConsult?.user.id}
            </div>
            <div>
              <span className="font-bold">Cliente : </span>
              {typeof dataConsult?.user == "object" && dataConsult?.user.name}
            </div>
            <div>
              <span className="font-bold">Camion : </span>
              {dataConsult?.truck}
            </div>
            <div>
              {" "}
              <span className="font-bold">Direccion : </span>
              {dataConsult?.address}
            </div>
            <div>
              <span className="font-bold">Salida empresa : </span>
              {formaterDate(dataConsult?.initialDateCompany)}
            </div>
            {dataConsult?.initialDateCustomer !== null && (
              <div>
                <span className="font-bold">Llegada cliente : </span>
                {formaterDate(dataConsult?.initialDateCustomer)}
              </div>
            )}
            {dataConsult?.endDateCustomer !== null && (
              <div>
                <span className="font-bold">Salida cliente : </span>
                {formaterDate(dataConsult?.endDateCustomer)}
              </div>
            )}
          </section>
        </section>

        <section className="flex justify-center mt-[30px]">
          <button
            onClick={openModal}
            className={`bg-[#2c8d42] p-[10px] rounded-lg text-white ${
              (dataConsult?.initialDateCompany == null ||
                dataConsult?.endDateCompany == null) &&
              "opacity-60 pointer-events-none"
            }`}
          >
            Finalizar viaje
          </button>
        </section>
      </section>
    </article>
  );
}
