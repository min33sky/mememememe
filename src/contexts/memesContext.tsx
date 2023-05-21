'use client';

import { createContext, useContext, useMemo, useState } from 'react';

interface MemesContextState {
  memes: Meme[];
  addMeme: (meme: Meme) => void;
}

export const memesContext = createContext<MemesContextState | undefined>(
  undefined,
);

export default function MemesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [memes, setMemes] = useState<Meme[]>([]);

  const addMeme = (meme: Meme) => {
    setMemes((prev) => [...prev, meme]);
  };

  return (
    <memesContext.Provider
      value={{
        memes,
        addMeme,
      }}
    >
      {children}
    </memesContext.Provider>
  );
}

export function useMemes() {
  const context = useContext(memesContext);

  if (!context) {
    throw new Error('useMemes must be used within a MemesProvider');
  }

  return context;
}
