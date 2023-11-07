import { TOKEN, URL_API } from "../../../../Config";
import { AddErrorInput } from "../../../CreateTrip/models/ScheduleDay/types";
import { translateM } from "../../../service/translateM";

export async function consultDate(addErrorInput: AddErrorInput, date: string) {
  try {
    const response = await fetch(URL_API + "trip-available-date/" + date, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: TOKEN,
      },
    });
    if (!response.ok) {
      const message: { message: string } = await response.json();
      throw { status: response.status, message: message.message };
    }
    const data: { available: boolean } = await response.json();
    if (data.available) {
      addErrorInput("scheduleDay", null);
    }
  } catch (e: any) {
    if (typeof e === "object") {
      const messageEs = await translateM(e.message);
      addErrorInput("scheduleDay", messageEs);
    }
  }
}
