interface Props {
  action:()=>void
} 

export function BtnCancelM({action}:Props) {
  return (
    <button
      className="bg-red-600 px-[10px] py-[5px] text-white rounded-md"
      onClick={action}
    >
      Cancelar
    </button>
  );
}
