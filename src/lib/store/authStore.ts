import { create } from "zustand";
import { getSession, userLogin, userRegister } from "../action/authActions";

type CounterStore = {
  count: number;
  increment: () => void;
  incrementAsync: () => Promise<void>;
  decrement: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  incrementAsync: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count + 1 }));
  },
  decrement: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));



// {
//     "id": "65dc46763d1af65479773518",
//     "name": null,
//     "email": "123123",
//     "password": "$2a$10$Jvy5yNnVPxI2UxlwsTlpJOvcohjtm9czBRxLo2KSBLOaojYa6eY4C",
//     "emailVerified": null,
//     "image": null
// }


type authStore = { 
    user: any;
    setUser: (user: any) => void;
    logout: () => void;
    login: (data: any) => void;
    register: (data: any) => void;
    getSession: () => void;
}

export const useAuthStore = create<authStore>((set) => ({
    user: null,
    setUser: (user) => {
        set({ user })
    },
    logout: () => {
        set({ user: null })
    },
    login: async (data) => {
        const res = await userLogin(data);
        if (res && res.message) {
            set({ user: res })
        }
    },
    register: async (data) => {
        await userRegister(data);
    },
    getSession: async () => {
        const user = await getSession();
        set({ user })
    }
})
)