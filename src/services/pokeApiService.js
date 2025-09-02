

const capitalizeName = (name) => {
  if (!name) return ""
  return name.charAt(0).toUpperCase() + name.slice(1)
}


const getStatValue = (statsArray, statName) => {
  if (!Array.isArray(statsArray)) return null
  const statObject = statsArray.find((stat) => stat.stat.name === statName)
  return statObject ? statObject.base_stat : null
}

/**
 * Fetch a single page of Pokémon data
 * @param {number} page 
 * @param {number} pageSize 
 */

export const fetchPokemonPage = async (page = 1, pageSize = 20) => {
  try {
    const offset = (page - 1) * pageSize
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
    )
    const data = await response.json()

    
    const pageDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailRes = await fetch(pokemon.url)
        const detailData = await detailRes.json()

        return {
          id: detailData.id,
          name: capitalizeName(detailData.name),
          sprite: detailData.sprites.front_default,
          types: detailData.types.map((t) => t.type.name).join(", "),
          hp: getStatValue(detailData.stats, "hp"),
          attack: getStatValue(detailData.stats, "attack"),
          defense: getStatValue(detailData.stats, "defense"),
        }
      })
    )

    return { results: pageDetails, totalCount: data.count }
  } catch (error) {
    console.error("Error fetching Pokémon page:", error)
    return { results: [], totalCount: 0 }
  }
}


