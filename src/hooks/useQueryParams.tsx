import { useLocation, useNavigate } from "react-router-dom";
import { AddValueUrl, GetValueUrl } from "../Models";

export function useQueryParams() {
    const location = useLocation()
    const navigate = useNavigate()

    const addValueUrl:AddValueUrl = (url, key, value)=> {
        navigate(`${url}/?${key}=${value}`)
    }

    const getValueUrl:GetValueUrl = (param) =>{
        const urlParams = new URLSearchParams(location.search)
        const value = urlParams.get(param) || ""
        return value
    }

    return {
        addValueUrl,
        getValueUrl
    }

}