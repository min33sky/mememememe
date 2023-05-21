'use client';

import { useMemes } from '@/contexts/memesContext';
import React from 'react';
import MemeDisplay from './MemeDisplay';
import memeTemplates from '@/data/memeTemplates';

interface ModalProps {
  closeModal?: () => void;
}

const Modal = React.forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
  const { memes } = useMemes();

  console.log('memes: ', memes);

  const meme = memes[0];

  return (
    <dialog
      ref={ref}
      onClose={(e) => {
        const target = e.target as HTMLDialogElement;
        console.log(target.returnValue);
      }}
      onClick={(e) => {
        const target = e.target as HTMLDialogElement;
        if (target.nodeName === 'DIALOG') target.close();
      }}
      className="text-md inset-0 block w-2/3 max-w-5xl translate-y-20 rounded-2xl p-0 opacity-0  transition-[opacity,transform] duration-300 backdrop:backdrop-blur-sm open:translate-y-0 open:opacity-100 [&:not([open])]:pointer-events-none "
    >
      <div>
        <header className="relative rounded-t-2xl bg-white px-8 pt-6">
          <h1 className="text-lg font-bold text-black">밈 생성 결과</h1>
          <button
            type="button"
            onClick={props.closeModal}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 p-3 text-xl"
          >
            <span className="sr-only">close</span> &times;
          </button>
        </header>

        <div className="bg-slate-400 p-4">
          {/* <MemeDisplay
            key={meme.id}
            template={
              memeTemplates.find((template) => template.id === meme.template)!
            }
            values={meme.values}
          /> */}
        </div>

        <footer className="flex justify-end p-4">
          <button className="rounded-md bg-teal-600 px-4 py-3 font-bold text-white transition hover:bg-teal-700">
            저장하기
          </button>
        </footer>
      </div>
    </dialog>
  );
});

Modal.displayName = 'Modal';

export default Modal;
