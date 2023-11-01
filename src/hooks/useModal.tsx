import { useState } from "react"

export function useModal() {
    const [modal, setModal] = useState<boolean>(false)

    function closeModal() {
        document.body.classList.remove("active-modal")
        setModal(false)
    }

    function openModal() {
        document.body.classList.add("active-modal")
        setModal(true)
    }

    return {
        closeModal,
        openModal,
        modal
    }
}