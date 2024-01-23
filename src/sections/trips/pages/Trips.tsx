import { useEffect, useMemo, useState } from "react";
import { useConsult } from "../../../hooks/useConsult";
import { InputDate } from "../components/InputDate";
import { ListPaginate, TripType } from "../../../Models";
import { Errors } from "../../../components/Errors";
import { Loading } from "../../../components/Loading";
import { Grid } from "../../../components/Grid";
import { Pagination } from "../../../components/Pagination";
import { usePaginate } from "../../../hooks/usePaginate";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export function Trips() {
  const dateToday:string = useMemo(()=>{
    const today = new Date()
    return String(format(today,'yyyy-MM-dd'))
  },[])
  const [date, setDate] = useState<string>(dateToday);
  const { page,nextPage,prevPage } = usePaginate()
  const { fecthingData, dataConsult, codeState, mssg, loading } = useConsult<
    null,
    ListPaginate<TripType>
  >(`trips-without-date/${date}?page=${page}`);

  useEffect(() => {
    fecthingData();
  }, [date]);

  if (loading) {
    return <Loading />;
  } else if (codeState !== 200) {
    return <Errors message={mssg} />;
  }
  return (
    <section className="space-y-[200px]">
      <InputDate date={date} setDate={setDate} />


      <section>
        <div className="flex w-full justify-between text-white">
          <Link to={""} ></Link>
          <Link to={""}>ddd</Link>
          <Link to={""}>ddd</Link>
        </div>
         
         <div className="w-full h-[2px] bg-white"></div>
      </section>

      <div>
          <Grid>
          {dataConsult?.results.map((trip) => {
            return <div>{trip.id}</div>;
          })}
        </Grid>
        <Pagination dataConsult={{
          next:dataConsult?.next,
          previous:dataConsult?.previous
        }} page={page} nextPage={nextPage} prevPage={prevPage}/>
      </div>
      
    </section>
  );
}
