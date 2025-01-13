import { useState } from "react";

interface Modals {
  [key: string]: boolean;
}

const UseModal = () => {
  const [modals, setModals] = useState<Modals>({});

  const openModal = (key: string) => {
    setModals((prev) => ({
      ...prev,
      [key]: true,
    }));
  };

  const closeModal = (key: string) => {
    setModals((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const isOpen = (key: string) => modals[key];

  return {
    openModal,
    closeModal,
    isOpen,
  };
};

export default UseModal;
