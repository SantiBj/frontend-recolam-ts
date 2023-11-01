import { useMemo, useEffect } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { AddValueCont } from "../../models/types.d.all";
import { DataState } from "../../models/types.d.all";
import { AddUrlDirectory } from "../../models/types.d.all";
import { usePaginate } from "../../../hooks/usePaginate";
import { useConsult } from "../../../hooks/useConsult";
import { Loading } from "../../../components/Loading";
import { Errors } from "../../../components/Errors";
import { Pagination } from "../../../components/Pagination";
import { ListPaginate } from "../../../Models";
import { AddTruck, TruckType } from "../../models/truck/types";
import { CardTruck } from "../../../components/CardTruck";
import { Grid } from "../../../components/Grid";

interface Props {
  addUrlDirectory: AddUrlDirectory;
  truckSelected: DataState;
  addValue: AddValueCont;
  newDateTrip: any;
  isCreate: boolean;
}

export function ContentCardsTruck({
  addUrlDirectory,
  truckSelected,
  addValue,
  newDateTrip,
  isCreate = false,
}: Props) {
  const { addValueUrl, getValueUrl } = useQueryParams();
  const initialPaginate = useMemo(() => {
    if (isCreate) {
      const numberPaginate: string = getValueUrl("page");
      if (numberPaginate === "") {
        return 1;
      } else {
        parseInt(numberPaginate);
      }
    } else {
      return 1;
    }
  }, []);

  const { page, nextPage, prevPage } = usePaginate(initialPaginate);
  const { dataConsult, codeState, mssg, loading, fecthingData } = useConsult<
    null,
    ListPaginate<TruckType>
  >(`trucks-available-date/${newDateTrip}?page=${page}`);

  useEffect(() => {
    fecthingData();
  }, [page]);

  const addTruck: AddTruck = (placa) => {
    addValue("truck", placa);
    if (isCreate) {
      addValueUrl("/create-trip/truck", "page", page);
      addUrlDirectory("truck", `/create-trip/truck?page=${page}`);
    }
  };

  if (loading || loading == null) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    return <Errors message={mssg} />;
  }
  return (
    <div className="space-y-[40px]">
      <Grid>
        {dataConsult?.results.map((truck) => (
          <CardTruck
            key={truck.placa}
            addTruck={addTruck}
            truck={truck}
            stateTrip={truckSelected}
          />
        ))}
      </Grid>

      <Pagination
        dataConsult={{
          next: dataConsult?.next,
          previous: dataConsult?.previous,
        }}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
}
