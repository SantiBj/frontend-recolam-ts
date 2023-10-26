import { useEffect } from "react"
import { ListPaginate, TripType } from "../../../Models"
import { useConsult } from "../../../hooks/useConsult"
import { usePaginate } from "../../../hooks/usePaginate"
import { Loading } from "../../../components/Loading"
import { Errors } from "../../../components/Errors"
import { CardTrip } from "../../../components/CardTrip"
import { Pagination } from "../../../components/Pagination"
import { TittleMajor } from "../../../components/TittleMajor"

export function TripsActives() {

  const { page, nextPage, prevPage } = usePaginate()
  const { dataConsult, codeState, mssg, loading, fecthingData } =
    useConsult<null, ListPaginate<TripType>>(`trips-actives-today-all?page=${page}`)

  useEffect(() => {
    fecthingData()
  }, [page])


  if (loading || loading == null) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    return <Errors message={mssg} />;
  }
  return (
    <article className="space-y-[150px]">
      <TittleMajor text="Viajes activos"/>
      <section>
        {dataConsult?.results.map((trip) => (
          <CardTrip trip={trip} to={"/trip-active-details/"} />
        ))}
      </section>
      <Pagination
        dataConsult={{
          previous: dataConsult?.previous,
          next: dataConsult?.next
        }}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </article>
  )
}
