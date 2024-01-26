import { MdOutlineErrorOutline } from "react-icons/md";

export function Errors({ message }: { message: string | null }) {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="bg-white h-[30vh] min-h-[300px] w-[30%] mx-auto rounded-lg min-w-[290px] flex flex-col gap-[20px] justify-center items-center">
        <div className="text-red-500">
          <MdOutlineErrorOutline size={50} />
        </div>
        <div className="text-center w-[80%] mx-auto">{message}</div>
      </div>
    </section>
  );
}
