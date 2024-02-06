import { create } from "zustand";

const useDrag = create((set) => ({
    capId : "",
    setCapId : (event) => set({capId : event.target.id})
}))

export default useDrag;