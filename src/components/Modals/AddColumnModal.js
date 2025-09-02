
import { useState } from 'react'
import { usePokemonStore } from '../../store/pokemonStore'

export default function AddColumnModal() {
  const [name, setName] = useState('')
  const [type, setType] = useState('text')
  const addColumn = usePokemonStore((s) => s.addColumn)

  const handleAdd = () => {
    if (name) addColumn(name, type)
    setName('')
  }

  return (
    <div className="p-4 flex gap-2 items-center">
      <input
        className="border px-2 py-1"
        placeholder="Column name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select className="border px-2 py-1" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
      </select>
      <button className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer" onClick={handleAdd}>
        Add Column
      </button>
    </div>
  )
}