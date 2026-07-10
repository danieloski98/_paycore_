// hooks/useModal.ts
import { modalAtom, ModalType } from "@/states/modal-state";
import { useAtom } from "jotai";

export function useModal() {
  const [modal, setModal] = useAtom(modalAtom);

  return {
    modal, // { type, data }
    openModal: (type: ModalType, data?: unknown) => setModal({ type, data }),
    closeModal: () => setModal({ type: null }),
    isOpen: (type: ModalType) => modal.type === type,
    data: modal.data, // convenience access
  };
}
