import { ChangeEvent } from "react"

interface Props {
    type: "text" | "date" | "number",
    placeholder: string,
    onChange: (target: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    name: string,
    error: string | null
}

export function CustomInput({
    type,
    placeholder,
    onChange,
    value,
    name,
    error
}: Props) {
    return (
        <div className="flex flex-col w-full">
            <label>{placeholder} :</label>
            <input
                className="border-gray-300 border-[2px] p-[5px] rounded-lg placeholder:italic placeholder:text-slate-400"
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                name={name}
            />
            <div className="text-[14px] text-red-500">{error !== null && error}</div>
        </div>
    )
}