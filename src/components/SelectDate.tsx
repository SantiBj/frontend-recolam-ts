import { ChangeEvent } from "react"
import { DateType } from "../Models"

interface Props {
    dates: Array<DateType> | null,
    handleChange:(value:string)=>void,
    dateSelect:string
}

export function SelectDate({ dates, handleChange, dateSelect }:Props) {

    function change(e:ChangeEvent<HTMLSelectElement>){
        const { value } = e.target
        handleChange(value)
    }

    return (
        <select onChange={change} value={dateSelect} >
            <option value="">---</option>
            {dates !== null && dates.map((date) => (
                <option key={date} value={date}>
                    {date}
                </option>
            ))}
        </select>
    )
}