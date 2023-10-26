import { Link } from "react-router-dom"
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi"

interface Props {
    prev?: string
    next?: string
}

export function NavigateBetweenPages({ prev, next }: Props) {
    return (
        <section className="flex justify-between w-full">
            <Link to={prev!}>
                <div className={`bg-blue-200 rounded-full w-fit p-[5px] ${!prev && "opacity-60 pointer-events-none"}`}>
                    <HiOutlineArrowSmLeft size={30} />
                </div>
            </Link>
            <Link to={next!}>
                <div className={`bg-blue-200 rounded-full w-fit p-[5px] ${!next && "opacity-60 pointer-events-none"}`}>
                    <HiOutlineArrowSmRight size={30} />
                </div>
            </Link>
        </section>
    )
}