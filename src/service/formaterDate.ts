import { format } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"

type dateType = string| null | undefined

export function formaterDate(date:dateType):dateType {
    if (typeof date == "string"){
     const localDate:Date = utcToZonedTime(
        new Date(date),'America/Bogota'
    )
    return format(localDate,'yyyy-MM-dd HH:mm')   
    }
    return date
    
}