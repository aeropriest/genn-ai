import { create } from 'zustand';

interface useWaitModalStore {
  isOpen: boolean;
  onOpen: (title?: string) => void; // Pass the title as a parameter
  onClose: () => void;
  title?: string;
}

export const useWaitModal = create<useWaitModalStore>((set) => ({
  isOpen: false,
  onOpen: (title) => set({ isOpen: true, title }), // Assign the provided title
  onClose: () => set({ isOpen: false }),  
}));
