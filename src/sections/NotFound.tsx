import { Link } from "react-router-dom";
import { MdOutlineSearchOff } from "react-icons/md"

export function NotFound(){
    return(
        <article className="w-full h-[100vh] flex justify-center items-center">
            <div className="font-bold text-lg w-fit bg-white p-32 rounded-xl">
                <p className="text-red-600"><MdOutlineSearchOff size={40} /></p>
                <p>ERROR 404</p>
                <p>Ir al <Link className="text-blue-500" to={"/"}>Home</Link></p>
            </div>
        </article>
    )
}