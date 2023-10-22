interface Props {
    text: string,
    color: "white" | "black" | null,
    size: "lg" | "md" | "sm" | null
}

export function TittleMajor({ text, color = "white", size = "lg" }: Props) {
    return (
        <h2 className={`text-center text-${color} ${size == "lg" && "text-[32px]"}
        ${size == "md" && "text-[28px]"}
        ${size == "sm" && "text-[25px]"} font-bold`}>{text}</h2>
    )
}