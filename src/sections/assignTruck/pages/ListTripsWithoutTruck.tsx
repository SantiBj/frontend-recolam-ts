import { CardTrip } from "../../../components/CardTrip";
import { Errors } from "../../../components/Errors";
import { Grid } from "../../../components/Grid";
import { Loading } from "../../../components/Loading";
import { Pagination } from "../../../components/Pagination";
import { Title } from "../../../components/Title";
import { TittleMajor } from "../../../components/TittleMajor";
import { DatesOption } from "../components/DatesOption";
import { useLogic } from "../hooks/useLogic";

export function ListTripsWithoutTruck() {
  const {
    page,
    nextPage,
    prevPage,
    dataConsult,
    loading,
    codeState,
    mssg,
    addValueAndResetPage,
    inputDate,
  } = useLogic();

  if (loading || (loading == null && inputDate !== "")) {
    return <Loading />;
  }
  if (codeState !== 200 && codeState !== null) {
    return <Errors message={mssg} />;
  }
  return (
    <div className="space-y-[100px] transition-all">
      <section className="space-y-[60px]">
        <TittleMajor text="Asignar Camión: " />
        <Title text="Seleccione una de las fechas :" />
      </section>
      <div className="flex justify-center">
        <DatesOption
          dataSelect={inputDate}
          setDataSelect={addValueAndResetPage}
        />
      </div>
      <Grid>
        {dataConsult?.results.map((trip) => (
          <CardTrip
            key={trip.id}
            trip={trip}
            to={`/trip/assign-truck/`}
            assignTruck
            oldTruckAssigned
          />
        ))}
      </Grid>
      {dataConsult !== null &&
        dataConsult.next !== null &&
        dataConsult.previous !== null && (
          <Pagination
            dataConsult={{
              next: dataConsult?.next,
              previous: dataConsult?.previous,
            }}
            page={page}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
    </div>
  );
}
