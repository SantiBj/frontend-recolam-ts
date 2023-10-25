import { TOKEN } from "../../Config"
import { Headers, Method } from "../Models"

export function calculatedHeaders<BF, BH>(bodyFunction: BF, bodyHook: BH,method:Method): Headers {
    if (bodyFunction !== null && typeof bodyFunction === 'object' && !("target" in bodyFunction)) {
        return headers<BF>(bodyFunction, false,method)
    } else {
        return headers(bodyHook, true,method)
    }
}

function headers<Tbody>(body: Tbody, isBodyHook: boolean,method:Method): Headers {
    return {
        method: method,
        body: isBodyHook ? (body !== null ? JSON.stringify(body) : null) : JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: TOKEN
        }
    }
}