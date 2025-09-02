

import { create } from "zustand"

export const usePokemonStore = create((set) => ({
  data: [],
  page: 1,
  totalCount: 0,

  // Setters
  setData: (newData) => set({ data: newData }),
  setPage: (page) => set({ page }),
  setTotalCount: (count) => set({ totalCount: count }),

  // Add new column dynamically
  addColumn: (name, type) =>
    set((state) => ({
      data: state.data.map((row) => ({
        ...row,
        [name]: getDefaultValue(type),
      })),
    })),
}))


const getDefaultValue = (type) => {
  if (type === "number") return 0
  if (type === "boolean") return false
  return ""
}
