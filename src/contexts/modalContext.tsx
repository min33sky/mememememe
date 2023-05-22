'use client';

import Modal from '@/components/Modal';
import React, {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ModalContextState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextState | undefined>(
  undefined,
);

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    dialogRef.current?.close();
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal ref={dialogRef} />
    </ModalContext.Provider>
  );
}
