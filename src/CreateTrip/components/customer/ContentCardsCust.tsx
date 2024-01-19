import { useEffect, useMemo, useState } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { AddUrlDirectory } from "../../models/types.d.all";
import { DataState } from "../../models/types.d.all";
import { AddValueCont } from "../../models/types.d.all";
import { usePaginate } from "../../../hooks/usePaginate";
import { useConsult } from "../../../hooks/useConsult";
import { CardCustomer } from "./CardCustomer";
import { AddCustomer, CustomerType } from "../../models/customer/types";
import { ListPaginate } from "../../../Models";
import { Pagination } from "../../../components/Pagination";
import { Errors } from "../../../components/Errors";
import { Loading } from "../../../components/Loading";
import { Grid } from "../../../components/Grid";

interface Props {
  addValueCont: AddValueCont;
  state: DataState;
  addUrlDirectory: AddUrlDirectory;
}

export function ContentCardsCust({
  addValueCont,
  state,
  addUrlDirectory,
}: Props) {
  const [ qtTrips,setQtTrips ] = useState<number|null>(null);
  const { addValueUrl, getValueUrl } = useQueryParams();

  const initialPagination: number = useMemo(() => {
    const pagination = getValueUrl("page");
    if (pagination == "") {
      return 1;
    }
    return parseInt(pagination);
  }, []);

  const { page, nextPage, prevPage } = usePaginate(initialPagination);
  const { fecthingData, dataConsult, codeState, mssg, loading } = useConsult<
    null,
    ListPaginate<CustomerType>
  >(`customers/${state.scheduleDay}?page=${page}`);

  useEffect(() => {
    fecthingData();
  }, [page]);

  const addCustomer: AddCustomer = (e) => {
    const infoInput = e.target
    console.log(Number(infoInput.dataset.quantity))
    setQtTrips(Number(infoInput.dataset.quantity))
    const { name, value }: { name: string; value: string } = infoInput;
    addValueCont(name, value);
    addValueUrl("/create-trip/customer", "page", page);
    addUrlDirectory("customer", `/create-trip/customer?page=${page}`);
  };

  if (loading || loading == null) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    return <Errors message={mssg} />;
  }
  return (
    <>
      {
         qtTrips !== null &&  <div className="text-white">
         numero de viajes cliente : {qtTrips}
       </div>
      }

      <Grid>
        {dataConsult?.results.map((customer) => (
          <CardCustomer
            key={customer.document}
            customer={customer}
            stateTrip={state}
            quantityTrips={customer.quantityTrips}
            addCustomer={addCustomer}
          />
        ))}
      </Grid>

      <Pagination
        dataConsult={{
          previous: dataConsult?.previous,
          next: dataConsult?.next,
        }}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );
}
