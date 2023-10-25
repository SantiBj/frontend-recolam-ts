import { useState } from "react"

export function useModal() {
    const [modal, setModal] = useState<boolean>(false)

    function closeModal() {
        setModal(false)
    }

    function openModal() {
        setModal(true)
    }

    return {
        closeModal,
        openModal,
        modal
    }
}