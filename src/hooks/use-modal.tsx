import { modalAtom, ModalType } from "@/states/modal-state";
import { useAtom } from "jotai";

export function useModal<T = unknown>() {
  const [modal, setModal] = useAtom(modalAtom);

  return {
    modal,

    openModal: (type: ModalType, data?: T) =>
      setModal({
        type,
        data,
      }),

    closeModal: () =>
      setModal({
        type: null,
      }),

    isOpen: (type: ModalType) => modal.type === type,

    data: modal.data as T | any,
  };
}