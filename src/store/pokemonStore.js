
import { create } from 'zustand'

export const usePokemonStore = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  addColumn: (name, type) =>
    set((state) => ({
      data: state.data.map((row) => ({ ...row, [name]: getDefaultValue(type) })),
    })),
}))

const getDefaultValue = (type) => {
  if (type === 'number') return 0
  if (type === 'boolean') return false
  return ''
}



