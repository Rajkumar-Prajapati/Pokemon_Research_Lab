


import { usePokemonStore } from '../../store/pokemonStore'
import { exportToCSV } from '../../utils/exportCSV'

export default function ExportButton() {
  const data = usePokemonStore((s) => s.data)

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded m-4 cursor-pointer"
      onClick={() => exportToCSV(data)}
    >
      Export CSV
    </button>
  )
}