interface Props {
  action:()=>void
}

export function BtnAcceptM({action}:Props){
    return (
        <button
          className="bg-green-600 px-[10px] py-[5px] text-white rounded-md"
          onClick={action}
        >
          Aceptar
        </button>
      );
}