import { ChangeEvent } from "react";
import { NameInput } from "../models/types";

interface Props {
  name: NameInput;
  label: string;
  value: string;
  example: string;
  errors: string | null;
  handleChange: (name: string, value: string) => void;
}

export function InputText({
  name,
  label,
  value,
  example,
  errors,
  handleChange,
}: Props) {
    
  function change(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  return (
    <section className="flex flex-col gap-[3px]">
      <label className="">{label}</label>
      <input
        onChange={change}
        required
        className={`p-[5px] ${
          name !== "id" && "capitalize"
        } border-gray-200 border-[2px] rounded-lg`}
        type="text"
        value={value}
        name={name}
        placeholder={example}
      />
      <div className="text-red-500 text-[14px]">
        {errors && <p>{errors}</p>}
      </div>
    </section>
  );
}
