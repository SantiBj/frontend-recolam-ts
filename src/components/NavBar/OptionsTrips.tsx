import { useState } from "react";
import { OptionsTripsUI } from "./OptionsTripsUI";

export function OptionsTrips() {
  const [optionsTrips, setOptionsTrips] = useState<boolean>(false);

  function handleMouseEnter() {
    setOptionsTrips(true);
  }

  function handleMouseLeave() {
    setTimeout(() => {
      setOptionsTrips(false);
    }, 500);
  }

  function handleClick() {
    setOptionsTrips(!optionsTrips);
  }

  return (
    <>
      <div className="p-[2px] z-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
        <div
          className="flex-col transition-all hidden md:flex border-[1px] border-dashed w-[125px] rounded-t-lg"
          
        >
          <OptionsTripsUI optionsTrips={optionsTrips} />
        </div>
      </div>
      <div
        className="flex-col transition-all md:hidden w-[125px] rounded-lg"
        onClick={handleClick}
      >
        <OptionsTripsUI optionsTrips={optionsTrips} />
      </div>
    </>
  );
}
