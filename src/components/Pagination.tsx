import { GoChevronLeft,GoChevronRight } from "react-icons/go"
import { ListPaginate } from "../Models";

interface Props<T> {
    dataConsult: T
    page: number,
    nextPage: () => void,
    prevPage: () => void
}

export function Pagination<T>({ dataConsult, page, nextPage, prevPage }: Props<T>) {
    return (
        <div className="w-full flex justify-between items-center">
            <button
                onClick={prevPage}
                className={`text-white ${dataConsult.previous == null && "pointer-events-none opacity-60"
                    }`}
            >
                <GoChevronLeft size={35} />
            </button>
            <p className="text-black font-bold bg-white py-[8px] px-[15px]  aspect-square rounded-full">{page}</p>
            <button
                onClick={nextPage}
                className={`text-white ${dataConsult.next == null && "pointer-events-none opacity-60"
                    }`}
            >
                <GoChevronRight size={40} />
            </button>
        </div>
    );
}