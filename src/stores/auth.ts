import { create } from 'zustand';

import { AuthState } from 'utils/const';

type Store = {
    state: AuthState
    setState: (newState: AuthState) => void
}

const useAuthStore = create<Store>((set) => ({
  state: AuthState.Loading,
  setState: (newSate) => set({ state: newSate }),
}));

export default useAuthStore;
