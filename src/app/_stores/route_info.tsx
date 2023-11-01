import { create } from "zustand";

export interface RouteInfoState {
    pageName: string,
    setPageName: (name: string) => void
}

export const useRouteInfo = create<RouteInfoState>((set) => ({
    pageName: "Особистий кабінет",
    setPageName: (name: string) => set((state) => ({ pageName: name }))
}))