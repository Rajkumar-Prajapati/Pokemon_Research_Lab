


import React from "react";
import { usePokemonStore } from "../../store/pokemonStore";
import { fetchPokemonPage } from "../../services/pokeApiService";

export default function DataTable() {
  const { data, page, totalCount, setData, setPage, setTotalCount } =
    usePokemonStore();
  const pageSize = 20;

  const totalPages = Math.ceil(totalCount / pageSize);

  const loadPage = async (pageNumber) => {
    const { results, totalCount } = await fetchPokemonPage(pageNumber, pageSize);
    setData(results);
    setPage(pageNumber);
    setTotalCount(totalCount);
  };

  const goToNextPage = () => {
    if (page < totalPages) loadPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) loadPage(page - 1);
  };

  if (!data || data.length === 0) {
    return (
      <p className="p-4 text-center">
        No Pokemon data yet. Please fetch first !
      </p>
    );
  }

  return (
    <div className="p-4">
      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {Object.keys(data[0]).map((key, idx) => (
              <th
                key={idx}
                className="border border-gray-300 px-3 py-2 text-left"
              >
                {key.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
              {Object.entries(row).map(([col, val], colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 px-3 py-2 text-center"
                >
                  {col === "sprite" ? (
                    <img src={val} alt={row.name} className="h-10 w-10 mx-auto" />
                  ) : (
                    val
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          ◀ Prev
        </button>

        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

