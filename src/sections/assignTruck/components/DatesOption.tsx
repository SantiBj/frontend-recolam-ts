import { useEffect } from "react"
import { useConsult } from "../../../hooks/useConsult"
import { Loading } from "../../../components/Loading"
import { Errors } from "../../../components/Errors"
import { ConsultDates } from "../models/types"
import { SelectDate } from "../../../components/SelectDate"

interface Props {
    dataSelect: string,
    setDataSelect: (value: string) => void
}


export function DatesOption({ dataSelect, setDataSelect }: Props) {

    const { dataConsult, mssg, codeState, loading, fecthingData } = useConsult<null,ConsultDates | null >("dates-trip-without-truck")

    useEffect(() => {
        fecthingData()
    }, [])

    function handleChange(value:string) {
        setDataSelect(value)
    }

    if (loading || loading == null) {
        return <Loading />
    }
    if (codeState !== null && codeState !== 200 && codeState !== 400) {
        return <Errors message={mssg} />
    }
    if (codeState == 400) {
        return <Errors message={"No hay viajes pendientes por asignar camion"} />;
    }
    return (
        <>
      {dataConsult !== null && (
        <SelectDate
          dates={dataConsult.dates}
          handleChange={handleChange}
          dateSelect={dataSelect}
        />
      )}
    </>
    )
}