import { useParams } from "react-router-dom";
import { decrypt } from "../../../service/encrypt";
import { useConsult } from "../../../hooks/useConsult";
import { useEffect, useMemo } from "react";
import { useDataInputs } from "../../../hooks/useDataInputs";
import { InitialDataForm } from "../../../CreateTrip/models/ScheduleDay/types";
import { useModal } from "../../../hooks/useModal";
import { Errors } from "../../../components/Errors";
import { Loading } from "../../../components/Loading";
import { ModalGeneric } from "../../../components/ModalGeneric";
import { ContentM } from "../components/ContentM";
import { NavigateBetweenPages } from "../../../components/NavigateBetweenPages";
import { TripType } from "../../../Models";
import { ContentTrucks } from "../components/ContentTrucks";

interface InpTruckType {
    truck: string;
}

interface ErrTruckType {
    truck: null | string;
}

const initialTruck: InitialDataForm<InpTruckType, ErrTruckType> = {
    inputs: {
        truck: "",
    },
    errors: {
        truck: null,
    },
};

export function TruckAvailable() {
    const { trip, date } = useParams();
    const tripDecrypt = decrypt(trip!);

    const { dataConsult, codeState, mssg, loading, fecthingData } = useConsult<
        null,
        TripType
    >(`trip/${tripDecrypt}`);

    useEffect(() => {
        fecthingData();
    }, []);

    const { data, addValueInput } = useDataInputs<InpTruckType, ErrTruckType>(
        initialTruck
    );
    const { modal, closeModal, openModal } = useModal();
    const text = useMemo(() => {
        return `¿Desea asignar el camion ${data.inputs.truck} al viaje ${tripDecrypt}?`;
    }, [data.inputs.truck]);

    if (loading == null || loading) {
        return <Loading />;
    }
    if (codeState !== 200 && codeState !== null) {
        return <Errors message={mssg} />;
    }
    return (
        <>
            <ModalGeneric
                content={
                    <ContentM
                        closeModal={closeModal}
                        text={text}
                        tripDecrypt={tripDecrypt}
                        truck={data.inputs.truck}
                    />
                }
                isOpen={modal}
            />
            <NavigateBetweenPages
                prev={`/assign-truck/list/?date=${dataConsult !== null && dataConsult.scheduleDay
                    }`}
            />
            {data.inputs.truck !== null && (
                <div>Camion Seleccionado = {data.inputs.truck}</div>
            )}
            <section>
                <div>
                    Fecha del viaje : {dataConsult !== null && dataConsult.scheduleDay}
                </div>
                <div>
                    {dataConsult !== null &&
                        typeof dataConsult.user === "object" &&
                        ` Cliente :  ${dataConsult.user.name}  Id : ${dataConsult.user.id}`}
                </div>
                <div>Direccion : {dataConsult !== null && dataConsult.address}</div>
            </section>
            <div>
                <ContentTrucks
                    date={date!}
                    inputTruck={data.inputs}
                    addValueInput={addValueInput}
                />
            </div>
            <button
                onClick={openModal}
                className={`${data.inputs.truck !== null
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-60 pointer-events-none"
                    } bg-green-400 p-[5px]`}
            >
                asignar camion
            </button>
        </>
    );
}
