
import React from "react"
import CSVUploader from "../components/Upload/CSVUploader"
import DataTable from "../components/Table/DataTable"
import AddColumnModal from "../components/Modals/AddColumnModal"
import ExportButton from "../components/UI/ExportButton"
import ChatOverlay from "../components/Chat/ChatOverlay"
import { fetchPokemonPage } from "../services/pokeApiService"
import { usePokemonStore } from "../store/pokemonStore"

export default function Home() {
  const { setData, setPage, setTotalCount } = usePokemonStore()
  const pageSize = 20

  const handleFetch = async (pageNumber = 1) => {
    const { results, totalCount } = await fetchPokemonPage(pageNumber, pageSize)
    setData(results)
    setPage(pageNumber)
    setTotalCount(totalCount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">
        
        {/* Header */}
        <div className="border-2 border-indigo-300 rounded-lg p-4 mb-8 bg-indigo-50">
          <h1 className="text-4xl font-extrabold text-center text-indigo-700 tracking-tight">
            Pokemon Research Lab
          </h1>
        </div>

        
        <ChatOverlay />

        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition transform text-white px-6 py-2 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleFetch(1)}
          >
            🔄 Fetch Full Pokedex Dataset
          </button>

          <div className="flex flex-col items-start">
            <label className="text-sm font-medium text-gray-700 mb-1 cursor-pointer">
              Upload CSV File
            </label>
            <CSVUploader />
          </div>

          <ExportButton />
        </div>

        
        <div className="mb-6">
          <AddColumnModal />
        </div>

        
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <DataTable />
        </div>
      </div>
    </div>
  )
}
