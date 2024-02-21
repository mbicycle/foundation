import { create } from 'zustand';

type User = {
    name: string,
    role: string
}

type Store = {
    user: User | null,
    setUser: (user: User) => void
    removeUser: () => void
}

const useUserStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));

export default useUserStore;
