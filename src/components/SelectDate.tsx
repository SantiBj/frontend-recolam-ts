import { ChangeEvent } from "react";
import { DateType } from "../Models";

interface Props {
  dates: Array<DateType> | null;
  handleChange: (value: string) => void;
  dateSelect: string;
}

export function SelectDate({ dates, handleChange, dateSelect }: Props) {
  function change(e: ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    handleChange(value);
  }


  return (
      <select
        className="shadow-sm shadow-white px-[15px] w-[150px] py-[10px] rounded-lg"
        onChange={change}
        value={dateSelect}
      >
        {dates !== null &&
          dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
      </select>
  );
}
