import { ReactNode, createContext, useState } from "react";
import { URL_API, TOKEN } from "../../../Config"
import { AddValueCont, ChangeScheduleDay, ClearValueKey, DataState } from "../models/types.d.all";
import { DataContext } from "../models/types.d.all"
import { AddErrorInput } from "../models/ScheduleDay/types.d";
import { translateM } from "../../service/translateM";

export const createTrip = createContext<null | DataContext>(null);

const initialData: DataState = {
  scheduleDay: "",
  user: "",
  truck: "",
  address: ""
}

interface Props {
  children: ReactNode
}

export function CreateTrip({ children }: Props) {
  const [state, setState] = useState<DataState>(initialData)

  const addValueCont: AddValueCont = (key, value) => {
    setState({
      ...state,
      [key]: value
    })
  }

  const clearValueKey: ClearValueKey = (key) => {
    setState({
      ...state,
      [key]: ""
    })
  }

  const changeScheduleDay: ChangeScheduleDay = (value, addErrorInput) => {
    if (value.trim().length == 0) {
      if (state.scheduleDay !== "") {
        addValueCont("scheduleDay", "")
      }
      addErrorInput("scheduleDay", "La fecha es requeridad")
    } else {
      addValueCont("scheduleDay", value)
      addErrorInput("scheduleDay", null)
      if (state.user !== "") {
        setState({
          ...state,
          scheduleDay: value,
          user: "",
          truck: ""
        })
      }
      consultAvailableDay(addErrorInput, value, addValueCont)
    }
  }

  async function consultAvailableDay(addErrorInput: AddErrorInput, date: string, addValueCont: AddValueCont): Promise<void> {
    try {
      const response = await fetch(URL_API + "trip-available-date/" + date, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: TOKEN,
        }
      })
      if (!response.ok) {
        const message: { message: string } = await response.json()
        throw { status: response.status, message: message.message }
      }
      const data: { avaliable: boolean } = await response.json()
      if (data.avaliable) {
        addErrorInput("scheduleDay", null)
      }
    } catch (e: { state: string, message: string }) {
      const messageEs = await translateM(e.message)
      addErrorInput("scheduleDay", messageEs)
      addValueCont("scheduleDay", "")
    }
  }

  const value: DataContext = {
    state,
    addValueCont,
    changeScheduleDay,
    clearValueKey
  }

  return <createTrip.Provider value={value}>{children}</createTrip.Provider>;
}
