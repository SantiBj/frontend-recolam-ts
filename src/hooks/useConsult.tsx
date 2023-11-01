import { useState } from "react"
import { URL_API } from "../../Config"
import { Method, Body } from "../Models"
import { calculatedHeaders } from "../helpers/helperUseConsult"
import { translateM } from "../service/translateM"



export function useConsult<B, Resp>(url: string, method: Method = "GET", body: Body<B> = null) {
    const [dataConsult, setDataConsult] = useState<Resp | null>(null)
    const [codeState, setCodeState] = useState<number | null>(null)
    const [mssg, setMssg] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean | null>(null)

    function resetAll(): void {
        setDataConsult(null)
        setCodeState(null)
        setMssg(null)
        setLoading(null)
    }

    async function fecthingData<Bd>(bodyConsult: Body<Bd> = null): Promise<void> {
        const headersConsult = calculatedHeaders<Body<Bd>, Body<B>>(bodyConsult, body, method)
        try {
            setLoading(true)
            const response = await fetch(URL_API + url, headersConsult)
            if (!response.ok) {
                const message = await response.json()
                throw { status: response.status, message: message.message }
            }
            const data: Resp = await response.json()
            setDataConsult(data)
            setCodeState(200)
        } catch (e: any) {
            let message: string;

            if (typeof e.message === "object") {
                const keys: Array<string> = Object.keys(e.message);
                message = await translateM(e.message[keys[0]])
                console.log(message)
            } else {
                message = await translateM(e.message)
            }
            setMssg(message)
            setCodeState(parseInt(e.status))

        } finally {
            setLoading(false)
        }

    }

    return {
        resetAll,
        fecthingData,
        dataConsult,
        setDataConsult,
        codeState,
        setCodeState,
        mssg,
        setMssg,
        loading
    }
}