import { CardTrip } from "../../../components/CardTrip";
import { Errors } from "../../../components/Errors";
import { Grid } from "../../../components/Grid";
import { Loading } from "../../../components/Loading";
import { Pagination } from "../../../components/Pagination";
import { SelectDate } from "../../../components/SelectDate";
import { Title } from "../../../components/Title";
import { TittleMajor } from "../../../components/TittleMajor";
import { usePaginate } from "../../../hooks/usePaginate";
import { useLogicData } from "../hooks/useLogicData";

export function ListTrips() {
  const { page, nextPage, prevPage } = usePaginate();
  const { trips, changeDate, datesConsulted, date, loading, mssg } =
    useLogicData(page);

  if (loading) {
    return <Loading />;
  }
  if (mssg !== null) {
    <Errors message={mssg} />;
  }
  return (
    <article className="space-y-[100px] transition-all">
      <section className="space-y-[60px]">
        <TittleMajor text="Viajes a editar" />
        <Title text="Seleccione una de las fechas :" />
      </section>
      <section className="flex justify-center">
        <SelectDate
          dates={datesConsulted}
          dateSelect={date}
          handleChange={changeDate}
        />
      </section>
      <Grid>
        {trips !== null &&
          trips.results.map((trip) => (
            <CardTrip
              key={trip.id}
              trip={trip}
              to="/trip-edit/"
              editTrip
              oldTruckAssigned
            />
          ))}
      </Grid>
      {trips?.next !== null ||
        trips?.previous !== null && (
          <Pagination
            dataConsult={{
              next: trips.next,
              previous: trips.previous,
            }}
            page={page}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
    </article>
  );
}
