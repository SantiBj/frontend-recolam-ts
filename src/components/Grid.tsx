import React from "react"

interface Props {
    children: React.ReactNode
}

export function Grid({ children }:Props){
    return (
        <section  className="grid justify-items-center gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full">
            { children }
        </section>
    )
}