import { NavLink } from "react-router-dom";


export function InternalNav() {
  return (
    <section className="w-[50%] my-[70px] max-w-[250px] min-w-[100px] space-y-[5px]">
      <div className="flex w-full justify-between text-white">
        <NavLink
            style={({isActive})=>{
                return {
                    background: isActive ? "green" : "inherit",
                }
            }}
          className="relative w-[180px] py-[3px] hover:scale-110 rounded-xl transition-all text-center"
          to={"/trips/not-actives"}
        >
            {   
                 <span className="animate-ping absolute right-0 inline-flex 
                 h-[10px] w-[10px] rounded-full bg-green-500 opacity-80">
                 </span>
            }
          Sin Iniciar
        </NavLink>
        <NavLink
        style={({isActive})=>{
            return {
                background: isActive ? "green" : "inherit",
            }
        }}
          className="w-[180px] py-[3px] hover:scale-110 rounded-xl transition-all text-center"
          to={"/actives"}
        >
          Activos
        </NavLink>
      </div>
      <div className="h-[2px] bg-white"></div>
    </section>
  );
}
