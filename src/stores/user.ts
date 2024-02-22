import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type User = {
    name: string,
    role: string
}

type Store = {
    user: User | null,
    setUser: (user: User) => void
    removeUser: () => void
}

const useUserStore = create<Store>()(devtools((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
})));

export default useUserStore;
