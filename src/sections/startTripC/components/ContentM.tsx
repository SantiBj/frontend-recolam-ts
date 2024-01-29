import { useNavigate } from "react-router-dom";
import { TripType } from "../../../Models";
import { useConsult } from "../../../hooks/useConsult";
import { Loading } from "../../../components/Loading";
import { BiCheckCircle, BiErrorAlt } from "react-icons/bi";
import { BtnAcceptM } from "../../../components/BtnAccepM";
import { BtnCancelM } from "../../../components/BtnCancelM";
import { Actions } from "../../trips/models/types";
import { useMemo } from "react";

interface Props {
  closeModal: () => void;
  trip: TripType;
  action: Actions;
}

export function ContentM({ closeModal, trip, action }: Props) {
  const navigate = useNavigate();

  const dataConsult = useMemo(() => {
    switch (action) {
      case "DELETE":
        return {
          message: `¿ Deseas eliminar el viaje del cliente ${
            typeof trip.user === "object" && trip?.user.name
          }?`,
          url: "trip-delete/",
          success: "El viaje a sido eliminado.",
          img:"https://cdn-icons-png.flaticon.com/512/7952/7952156.png",
          redirect:"/trips/not-actives"
        };
      case "START":
        return {
          message: `¿ Deseas iniciar el viaje del cliente ${
            typeof trip.user === "object" && trip?.user.name
          } con el camion
        ${trip.truck} ?`,
          url: "trip/set-stage-trip/",
          success: "El viaje a iniciado.",
          img:"https://cdn-icons-png.flaticon.com/256/4511/4511039.png",
          redirect:"/trips/actives"
        };
      case "CANCEL":
        return {
          message: `¿ Deseas cancelar el viaje del cliente ${
            typeof trip.user === "object" && trip?.user.name
          } ?`,
          url: "trip-cancel/",
          success: "El viaje a sido cancelado.",
          img:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABJlBMVEXy8vL///9MbLXi5/a1LyjIze07WJKdob/0qTz2uUDGy+3L0O+fqc8wUI3h4/D19fRAXpxVcrigpMHm6/nBw9SxtMqXnLzi4ujNz9tAZLLs7fHl5/Cssc/1+fn0rD31sT7U2O6zIxq9wuHYqKbZ2uLjr1b7rDH7uzrhoVO0KSGyHBGzIhk7Zrt7eqC0mH+zj32xEQD626rVnZr3xGf97t/t4+L51Kn2tmVwiMG/VFC6QTvy5NTfvLrcsrDw8/qClsfId3S9TUhGYJZdebvz1rLy7OMxVJl5ia9gdqcfRojo1tXkyMfFambMg4C4ODHt5OT3vE34zpj75sT3xH/zoh/1slT50o/4yHR6eaBqf6qOjKnDp4hrg7/zv3h8ksXPkY/GucbCYFz5+/wlAAANHUlEQVR4nO2dC1fbRhbHJ4SAIaETGgJ+DcFAzUpOWseJAwbjRwh52ICbBLqbLA3l+3+JHUmWPO/RyNiRvPqf03NybF3u/Obe0Tyu5IJ7sy7wsxswcaWEyVdKmHylhIxe/rlXvvr8Oqq3L6/2yptfj6Kav/5rby+z/8XMyIjw9dLe0tJmpnz5xszJUPAVNn+WyVx+jWR+D/MtLWHzK6MeNiF8jR04hNjJZ8PGuXIAHcJMeT+K+V+u+4wjE0QTwj+XfMLMZYRE9Vr4zDWPkARfXHOP0KSHDAiHLjaNfXiCnrlLmCkbm997tTQivDQYiwaE/yYJN09NW/iSJDRpoidviAwJMwYj2YBw2IkeYdk4TSnCsnGa0oQGKRSV0HwgpoQapYRSpYSEUkKNUkKN7ogwv329KlPuN2o+fCG9UKy53ynCP+YM7b9ThP8Smr/F+vhhDUkJW+1cbk6q5zThfxSXipRjCE3NX9CEz0UXLThaWfm0jsSEW3NKrwzhC7MWTo/QgXxbEBFuaXwmiHBhZaHAE7Z0PpJEiKOIOMK2zmWiCBdW1lnCgtZjsggXVloMYXHmCJ8yhCdaH0kj/MYQ6h0mjHBhYeYJV1JCTimhrol3Q/hsCoSei8gr70xsCXNzv5Euyt/NmpjL/XePNP9dtY0R2X8nOwjvnkTm4xEWW69IF5dHW9cGbcy1Cy/3CPPym4J2mUiaX2+NiiaO9lvFuyXMHWxAjzATEEKoXwf55nNZiFzCzYAQwexqaPsihEd7owzAhAhuHHDm0QlzbQCBQxh4wIQAwGy4JuZOChAATDgyx4QAFk5C2mexOSZ8thnY77dwi7gsiEyYe4Q9gNZ+hpBDCOBuqCZe5x37N2XC3CHEbbwOBbjrmB+R5g4htn/EuI9KmGs7HkSE4aJ44gIinhDAvH457EUQE15yhAAyUYxKeJIHPGHZJQQhxqIXAiFhmCTAYxDICAHTQxEJh30IWn+TLjKnwEPUJZqX4ljvKMJ3Q3M20ThdD81PKe9/e4RMDkUkbA9d0E3cH36ozdPV/PDKUzIIl8MOAvlVTQdlffdkCvkdhPN0fMJhkjnaFLgA8EDdwmJgTubA18Bck+YHgTnZwZuBOZXm0QivAxfgSxCF8j4KfKypm7gRmJ+OemjzNPi0oO6gtZH7/QDx8kvwITVKIhHmtkcu0LsAEBBStvDHyBwcXXltLF8djT6EP5Q9RDoKEN+hkfk2YR6NcINoIjr9ulm+zOy/I/0qm0h2ENbnq/Jl+eozZa5KU6qDcKLuZy7Lm19PEWG+MS7hKqDUOj06OqU/UjcxSzURgVNsjihz1a2KGMWeHPct+iPiVhWJ8IBxwUs9EAs6c+VAJIehzD1xp4tE2Na7UM4XWkDlOGZSQOiemC+iEOZCECrXJVpzAFWEuyEIR+4nFcOfTTi6PFIMf4yZpXmdOcirCENk6Y/xCOdOtC2kZiSuidogKFOAmWyEIhbf0eZDbRCUi2f9zVB5Kw6W7XLlx57xtXkCVXs8fRPVu4sTrXl2bELdrUazxdNnuXITnPtF5749LqF2RtPs8HQ5oNl96XOAuPhxNEJu4cRIdSuc09+MNQtv3c2YWjJGJBxtYcUudJt0dRC1G2hNEKkN9EJEQqWPEActq0pCzRZfM99Q/fs4KqHyjh/isEzVQ+xhmUgn8hyiZ5qFyISKbtSOItdcOpJDnZrLRzKdQI/HIJybEyPCMCFQIIYsC+AJS+x+l7yKBTStzIgSFeb5yoGkjY8EbYT6k0Tf/KAgcr+mBDQlzLXzkG3gWujKCm7jLsMI4W7Y/sHmq2tsF8F8W5Wi5oTYSRGMvEAIs+Eb6Jjn2gUY2ON/Fdrq5wRZ+4MsJN2D4qr8LhqN0G3kWt5pHAT53WLIshFh/vxgu+CaQ1DYPjAskLpdvOu7X6MeExXy8YTvH+v1/v37t98+fPjwEf8rxOUCe9f829uo5o8/OuYf35P2YjwB4Yr0SsYOK+SlMvNx7cNeGpEwOUoJk6+UMPlKCZOvlDD5SgmTL5bw08qs6RND+Gj2xBA+eDhresAQLj+YNS2nhIlXSph8pYTJV0qYfKWEyRdHOAtSEv4yC9qixBCKiqyJ031KKWESlRImXylh8pUSJl8pYfKVEoYQHGlCBmPJgFC6es8Gop9rLegNNsDEFZ4QPpBswLbXA1ENhluSDdvyyED/gs9UCSXaXvTFEsosRgYpISeIKIUwTxIh5ukd1zqNC8uu2tZF9+zmuO8gzwghAr3a2XzVrljWvCfLqmDS25v+QAmZDEKEerUGhpvnhTEPO00oZ0wCIUT925IQb6iSfVgbyBjHJ3xoTLhtRIhAs1tV4HmRtO0bCeMdxPBXQ8KHRRNC1G9o+VxVrBoQMRoQimv/2yNAnlD4sEBxMTwhGnTsUHyO7G5fgGhASKBIxBA+XdcaaAhRs1QKy+fkavWcD+NECfUG6rf0wHnVgM9N1cMeixhjQjho2IaAziR5zCDGlxD1LkKPQFJ2jUaMLSHqq2ZAlarn1B+NKyHqlyIC4iiek1GMKSHqRY0ghxhPQlS3xgCkx2I8CQeHYwFixNEd1YBwcV0rdsbXSkwIzypcmw2RSz3/LxsQrulFnUTBrN5A+C4xqvHzYKUrX9xYh6LP/CCGJyQPAWUyNhABwh6/kqmcoR3Z+qbUAE0+5hX/bmNAODU1uIy0z3Bkd8QrHAyI16/8d3YfxpRQQOIAyhBLjQEUIloNEFPCAR+NM5+dT1QPUIho76BYEqJzdkxVzvzRykex1AjsBFEEsSSssw31I+hiMIgjQBGiN+/HjZALIQnIIvopOvyOQ3SDGDdCwABWzuivybGII0j/ACOL6I7EmBGyaWifya8gU3T4HYNodUHsCCE9F1odfkngI+IU5b9rMkHEc2K8CGGPTtJKTXB45iUqPQb9rwYXlH3pBsWMENWYYViVIbJj0PuizizQrcO7yVLjorXc4JZdsLGnLj4iNwadP1vnNl3VnglhQabdQHlTA6bKPeBX0GLEY1GK8oBOmocnvLMq97K0yi1aQEsSVfBRXXA2Z90aEU669oTQuWgTKETkBEWAOAXiRIj6t+L9kTBROUDxwUe1FxtCVO9Ij9f0iKIx6Jk2Y0KIQM1W1GB0icpNEyPCnSdxIETg+FBdolBHUTIGHZXO40DoDEDdUZoKUZqi887N9GcQLlOEaCAfgKEQVYDzVuMOCMeqcuMBWA1XBJWNRSgdgy5h14Dwoai1D5fJonUIQqbKrRuAVBSFhD3l+bh1aEBY/FWkxUUp4ZrQgLRY/yfkYwiOKqK1KIDHyjqxEeFE6vioeREyiPyG15P8qHgKhHqDLESwNs+vt8MDyo+KPUKTcTip2hOqn+ufKJEDqhGNZovJVddQ71YzHIU7egJRmqhWJxaEAKKm8p4q3NGHQqzcxIPQXZjKh6MqRX1ESQfZx3EhVA1HdYqqEe3+/dgQOsOxK0IMAyhN1KpRlduY0PS5NnQsCIQ+RX1EgbHVNdnjP9WLWdPoDZgqt6D6KwSE/GGwGLF0bkA4lSo3t8YUH/zWL8SHjHwNsWlCOAVxR1GSg98LS3pUzGTpIG5n3n2mtHIruMjb0UsQmTPvs7id6oMB/eBIZYfH8E/VRFtiCGh758GhmBGyaWqzT4sSO3oeEQJmurkYxK66BnpskZNBJE/V2ESFA+axotJ5/CqkALG1GRqRPvilowgHDeY+ZfdA/Ahhn70dkojsoROJyAM695n4EfJBJBD54ssIEY9B9kSr6j69Fz/CPj9tDxFFp2r+WOTGIB6FnXg+MQRQhztd9BDFxRcvinyK4iStg3gSgjrP4SDKDn4dREGKBgkcQ0LRPggjSmsTTqLygO6TJoaEeZk2gn8YGwj/p0bolj8Ft3fkB792TWTgPyQcnnAKVW5fA0G4lO8f8t9Vg/WeCeFdVWa0b1gK7qeGqnSiPMk+PUL1IW8IkdvmeBICdGP61hop65A4A4gpId5kRI+idVGP9s7MVAkBjIyIAcm/GltCnKjREEtd+pXn+BICdBzl7S77ljnZGZ+QLFrf7bvcqH9h8hawq+oN+1cMCCW/466qcovf/paeCLOC4MwsU0vzzXHedC4KRRWtmRNhvYH2bfWdizDlU0+W3RH86oAB4dTf5XYRB+dhK/12lw9gAgjDlE+9+JV2hD+pkI8/IYCo11H+8IfD192R/LxJIQGELmOtK/7xFhfP6jSF8XN0PxGEwKkR92+6VZbSKtlVq3Os+AmefGIInUDCQfOmMV+q2J4qFavb2ekBg18YijehR4nQoNfvN7H6vbr+t7BYwNgT+pwQOv/pr3wyacKxf71lPLFjUE+o1SKzplnUGkyOMF8Q8HGE9JdP9BrTYApSEs6EUsLk6/+OcPo3gknrCUPY+tkNunO1GMLZS9N7LOGsBbHFEc5aEO/xhEhvlSAhAeFMIY4AScLZGYstEooixIzJnxeftGgkhnAGlRImXylh8pUSJl//A20HCw+07mhvAAAAAElFTkSuQmCC",
          redirect:"/trips/not-actives"
        };
    }
  }, [action, trip]);

  const { mssg, codeState, resetAll, loading, fecthingData } = useConsult(
    dataConsult.url + trip.id,
    "PATCH"
  );

  function success() {
    closeModal();
    resetAll();
    navigate(dataConsult.redirect);
  }

  function error() {
    closeModal();
    resetAll();
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-[8px]">
      {loading && <Loading />}
      {codeState == null && (
        <>
          <img className="w-[100px] mb-[20px]" src={dataConsult.img} alt="" />
          <div className="text-center w-[80%]">{dataConsult.message}</div>
          <div className="flex gap-[20px] mt-[20px]">
            <BtnAcceptM action={fecthingData} />
            <BtnCancelM action={closeModal} />
          </div>
        </>
      )}
      {codeState == 200 && (
        <>
          <div className="text-green-600">
            <BiCheckCircle size={45} />
          </div>
          <div className="text-center">{dataConsult.success}</div>{" "}
          <div className="flex gap-[20px] mt-[20px]">
            <BtnAcceptM action={success} />
          </div>
        </>
      )}
      {codeState !== 200 && codeState !== null && (
        <>
          <div className="text-red-500">
            <BiErrorAlt size={45} />
          </div>
          <div className="text-center">{mssg}</div>{" "}
          <div className="flex gap-[20px] mt-[20px]">
            <BtnAcceptM action={error} />
          </div>
        </>
      )}
    </div>
  );
}
