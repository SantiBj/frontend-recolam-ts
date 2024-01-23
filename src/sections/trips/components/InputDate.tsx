import { useEffect} from "react";
import { SelectDate } from "../../../components/SelectDate";
import { useConsult } from "../../../hooks/useConsult";
import { DateType } from "../../../Models";
import { Loading } from "../../../components/Loading";
import { Errors } from "../../../components/Errors";


interface Props {
    date:string,
    setDate:(value:string)=>void
}

interface dates {
    dates:Array<DateType>
}

export function InputDate({date,setDate}:Props){

    const {
        fecthingData,
        dataConsult,
        codeState,
        mssg,
        loading
    } = useConsult<null,dates>("dates-trips");

    console.log(dataConsult?.dates)

    useEffect(()=>{
        fecthingData()
    },[])

    if(loading){
        return <Loading/>
    }else if(codeState !== 200){
        return <Errors message={mssg}/>
    }
    return (
        <SelectDate 
            dates={dataConsult?.dates || null}
            handleChange={setDate}
            dateSelect={date}
        />
    );
}