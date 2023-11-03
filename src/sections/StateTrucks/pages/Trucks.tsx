import { useConsult } from "../../../hooks/useConsult";
import { usePaginate } from "../../../hooks/usePaginate";
import { Loading } from "../../../components/Loading";
import { Errors } from "../../../components/Errors";
import { TittleMajor } from "../../../components/TittleMajor";
import { Grid } from "../../../components/Grid";
import { CardTruckC } from "../components/CardTruckC";
import { ListPaginate } from "../../../Models";
import { TruckType } from "../../../CreateTrip/models/truck/types";
import { useEffect } from "react";
import { Pagination } from "../../../components/Pagination";

export function Trucks() {
  const { page, nextPage, prevPage } = usePaginate();
  const { dataConsult, codeState, mssg, loading, fecthingData } = useConsult<
    null,
    ListPaginate<TruckType>
  >(`trucks?page=${page}`);

  useEffect(() => {
    fecthingData();
  }, [page]);

  if (loading || loading == null) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    return <Errors message={mssg} />;
  }
  return (
    <article className="space-y-[100px]">
      <TittleMajor text="Estado Camiones" />
      <section>
        <Grid>
          {dataConsult !== null &&
            dataConsult.results.map((truck) => (
              <CardTruckC truck={truck} key={truck.placa} />
            ))}
        </Grid>
      </section>
      <Pagination
        dataConsult={{
          next: dataConsult?.next,
          previous: dataConsult?.previous,
        }}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </article>
  );
}
