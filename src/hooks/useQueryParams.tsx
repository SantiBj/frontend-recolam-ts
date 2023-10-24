import { useLocation, useNavigate } from "react-router-dom";

export function useQueryParams() {
    const location = useLocation()
    const navigate = useNavigate()

    function addValueUrl(url:string, key:string, value:string) {
        navigate(`${url}/?${key}=${value}`)
    }

    function getValueUrl(param:string) {
        const urlParams = new URLSearchParams(location.search)
        const value = urlParams.get(param) || ""
        return value
    }

    return {
        addValueUrl,
        getValueUrl
    }

}