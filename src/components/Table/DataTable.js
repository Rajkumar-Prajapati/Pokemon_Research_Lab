
import { usePokemonStore } from '../../store/pokemonStore'

export default function DataTable() {
  const data = usePokemonStore((s) => s.data)

  if (data.length === 0) return <p className="text-center mt-4">No data loaded</p>

  const columns = Object.keys(data[0])

  return (
    <div className="overflow-auto max-h-[500px] border rounded-lg m-4">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 text-left">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t">
              {columns.map((col) => (
                <td key={col} className="px-4 py-2">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}