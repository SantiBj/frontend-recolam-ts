import { useEffect } from "react";
import { AddValueInput } from "../../../CreateTrip/models/ScheduleDay/types";
import { useConsult } from "../../../hooks/useConsult";
import { usePaginate } from "../../../hooks/usePaginate";
import { Errors } from "../../../components/Errors";
import { Loading } from "../../../components/Loading";
import { AddTruck, TruckType } from "../../../CreateTrip/models/truck/types";
import { ListPaginate } from "../../../Models";
import { Pagination } from "../../../components/Pagination";
import { CardTruck } from "../../../components/CardTruck";
import { Grid } from "../../../components/Grid";

interface Props {
  date: string;
  inputTruck: { truck: string };
  addValueInput: AddValueInput;
}

export function ContentTrucks({ date, inputTruck, addValueInput }: Props) {
  const { page, nextPage, prevPage } = usePaginate();
  const { dataConsult, codeState, mssg, loading, fecthingData } = useConsult<
    null,
    ListPaginate<TruckType>
  >(`trucks-available-date/${date}?page=${page}`);

  useEffect(() => {
    fecthingData();
  }, [page]);

  const addTruck: AddTruck = (truck) => {
    addValueInput({ name: "truck", value: truck });
  };

  if (loading || loading == null) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    return <Errors message={mssg} />;
  }
  return (
    <>
      <Grid>
        {dataConsult?.results.map((truck) => (
          <CardTruck
            key={truck.placa}
            addTruck={addTruck}
            truck={truck}
            stateTrip={inputTruck}
          />
        ))}
      </Grid>
      {dataConsult !== null && dataConsult.results.length > 0 && (
        <Pagination
          dataConsult={{
            next: dataConsult.next,
            previous: dataConsult.previous,
          }}
          page={page}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}{" "}
    </>
  );
}
