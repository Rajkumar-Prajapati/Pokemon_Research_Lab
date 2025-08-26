
import Papa from 'papaparse'
import { usePokemonStore } from '../../store/pokemonStore'

export default function CSVUploader() {
  const setData = usePokemonStore((s) => s.setData)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data)
      },
    })
  }

  return (
    <div className="p-4">
      <input type="file" accept=".csv" onChange={handleUpload} />
    </div>
  )
}