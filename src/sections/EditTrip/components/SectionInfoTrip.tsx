import { TripType } from "../../../Models";

export function SectionInfoTrip({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <section className="transition-all flex p-[15px] gap-[5px] flex-col w-full">
      <h3 className="font-bold">{label}</h3>
      <div className="border-gray-300 pl-[10px] rounded-md border-[1px]">
        {content}
      </div>
    </section>
  );
}
