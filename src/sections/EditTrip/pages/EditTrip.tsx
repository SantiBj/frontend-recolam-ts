import { Errors } from "../../../components/Errors";
import { Loading } from "../../../components/Loading";
import { Title } from "../../../components/Title";
import { TittleMajor } from "../../../components/TittleMajor";
import { useModal } from "../../../hooks/useModal";
import { Inputs } from "../components/Inputs";
import { useLogicEdit } from "../hooks/useLogicEdit";

export function EditTrip() {
  const { modal, openModal, closeModal } = useModal();
  const {
    loading,
    load,
    codeState,
    mssg,
    state,
    msg,
    inputs,
    handleChange,
    oldTrip,
    idTripEncript,
  } = useLogicEdit();

  if (loading || loading == null || load) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    return <Errors message={mssg} />;
  }
  if (state !== 200 && state !== null) {
    return <Errors message={msg} />;
  }
  return (
    <article className="space-y-[100px]">
      <section className="space-y-[30px]">
        <TittleMajor text="Viaje a editar" />
        <Title
          to={`/trips/?date=${oldTrip?.scheduleDay}`}
          text="Detalles del viaje :"
        />
      </section>
      <section className="p-[50px] flex flex-col w-[80%] max-w-[500px] mx-auto rounded-xl bg-white">
        <Inputs
          openModal={openModal}
          oldTrip={oldTrip!}
          inputs={inputs}
          idTripEncrypt={idTripEncript!}
          handleChange={handleChange}
        />
      </section>
    </article>
  );
}
