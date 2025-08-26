

export const fetchPokemonData  = async () => {
  try {
    const allPokemonDetails = []
    let offset = 0
    const pageSize = 100 
    let totalCount = null
    let pageCount = 0

    while (true) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`)
      const data = await response.json()

    
      if (totalCount === null) {
        totalCount = data.count
        pageCount = Math.ceil(totalCount / pageSize)
        console.log(`Total Pokémon: ${totalCount}`)
        console.log(`Total Pages: ${pageCount}`)
      }

     
      const pageDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailRes = await fetch(pokemon.url)
          const detailData = await detailRes.json()

          return {
            id: detailData.id,
            name: capitalizeName(detailData.name),
            sprite: detailData.sprites.front_default,
            types: detailData.types.map((t) => t.type.name).join(', '),
            hp: getStatValue(detailData.stats, 'hp'),
            attack: getStatValue(detailData.stats, 'attack'),
            defense: getStatValue(detailData.stats, 'defense'),
          }
        })
      )

      allPokemonDetails.push(...pageDetails)

      // Progress tracking
      offset += pageSize
      const remainingPages = Math.ceil((totalCount - offset) / pageSize)
      console.log(`Fetched page ${offset / pageSize} of ${pageCount}. Remaining: ${remainingPages}`)

      if (offset >= totalCount) break
    }

    return allPokemonDetails
  } catch (error) {
    console.error('Error fetching full Pokémon dataset:', error)
    return []
  }
}


const getStatValue = (statsArray, statName) => {
  const statObject = statsArray.find((stat) => stat.stat.name === statName)
  return statObject ? statObject.base_stat : null
}


const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}



