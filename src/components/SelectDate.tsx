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
    <div className="border-[2px] border-dotted p-[10px] rounded-lg w-[50%] max-w-[550px] min-w-[280px]">
      <select
        className=" px-[15px] py-[10px] w-full rounded-lg"
        onChange={change}
        value={dateSelect}
      >
        <option value="">---</option>
        {dates !== null &&
          dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
      </select>
    </div>
  );
}
