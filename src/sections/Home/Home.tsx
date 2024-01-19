import { useEffect } from "react";
import RECO from "../../utils/recolamHome.png";
import LAM from "../../utils/recolamHomeS.png";

export function Home() {
  useEffect(() => {
    document.body.classList.add("active-modal");
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, []);

  return (
    <div className="md:fixed md:top-[90px] top-[30%] bottom-[30%] z-10 left-0 right-0 md:bottom-0">
      <section className="relative p-[50px] bg-[#62756799] rounded-xl md:rounded-none md:bg-transparent md:p-0 w-full h-full">
        <div className="w-[50%] md:w-[50%] bg-[#62756799] h-full"></div>
        <div className="w-[50%] md:w-[40%] bg-transparent h-full"></div>
        <section className="md:absolute md:top-[40%] md:left-[10%] md:right-[46%] space-y-[40px]">
          <div className="flex flex-col items-center md:flex-row gap-[5px]">
            <img
              src={RECO}
              className="h-[80px] w-[250px] md:w-2/3 md:h-1/2"
              alt="Nombre Empresa"
            />
            <img
              src={LAM}
              className="h-[80px] w-[200px] md:w-1/2 md:h-1/2"
              alt="Nombre Empresa"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-[30px] md:gap-0 md:justify-around items-center md:w-[80vw]">
            <iframe
              className="md:ml-[-100px] md:w-[40%] max-w-[300px] aspect-video rounded-xl"
              src="https://www.youtube.com/embed/lnI0Py1dPkg?si=jWUUk2KzJqQ3-PA_"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
            <div className=" md:w-[250px] lg:w-[400px] text-white font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              blanditiis voluptatum, iusto quis iure ducimus debitis autem.
              Libero voluptas laudantium nulla, cupiditate exercitationem
              ratione suscipit voluptates, minus eligendi asperiores veniam!
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
