import { NoteDraft } from "../types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Draft {
  note: NoteDraft | null;
  setDraft: (note: NoteDraft) => void;
  clearDraft: (initialDraft: NoteDraft) => void;
}

export const useDraftNote = create<Draft>()(
  persist(
    (set) => ({
      note: null,
      setDraft: (note: NoteDraft) =>
        set((prevState) => ({ note: { ...prevState.note, ...note } })),
      clearDraft: () => set({ note: null }),
    }),
    { name: "draft", partialize: (state) => ({ draft: state.note }) }
  )
);
