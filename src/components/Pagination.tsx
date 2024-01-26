import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { DataPagination } from "../Models";

interface Props {
  dataConsult: DataPagination;
  page: number;
  nextPage: () => void;
  prevPage: () => void;
}

export function Pagination({ dataConsult, page, nextPage, prevPage }: Props) {
  return (
    <section className="absolute left-0 max-w-[1300px] w-[85%] mx-auto right-0 bottom-0">
      <div className="flex justify-between items-center">
        <button
          onClick={prevPage}
          className={`text-white ${
            dataConsult.previous == null ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <GoChevronLeft size={35} />
        </button>
        <p className="text-black font-bold bg-white py-[8px] px-[15px]  aspect-square rounded-full">
          {page}
        </p>
        <button
          onClick={nextPage}
          className={`text-white ${
            dataConsult.next == null ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <GoChevronRight size={40} />
        </button>
      </div>
    </section>
  );
}
