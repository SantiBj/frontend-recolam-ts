import { CardTrip } from "../../../components/CardTrip";
import { Errors } from "../../../components/Errors";
import { Loading } from "../../../components/Loading";
import { Pagination } from "../../../components/Pagination";
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
        inputDate
    } = useLogic()

    if (loading || (loading == null && inputDate !== "")) {
        return <Loading />;
    }
    if (codeState !== 200 && codeState !== null) {
        return <Errors message={mssg} />;
    }
    return (
        <div className="space-y-[30px]">
            <div>
                <DatesOption dataSelect={inputDate} setDataSelect={addValueAndResetPage} />
                {dataConsult?.results.map((trip) => (
                    <CardTrip
                        trip={trip}
                        to={`/trip/assign-truck/`}
                        assignTruck
                        oldTruckAssigned
                    />
                ))}
            </div>
            {
                dataConsult !== null && dataConsult.results.length > 0 &&
                <Pagination
                    dataConsult={{
                        next: dataConsult?.next,
                        previous: dataConsult?.previous
                    }}
                    page={page}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            }
        </div>
    )

}