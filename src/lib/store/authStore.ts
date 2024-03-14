import { create } from "zustand";


type authStore = { 
    user: any;
}

export const useAuthStore = create<authStore>((set) => ({
    user: null,
})
)