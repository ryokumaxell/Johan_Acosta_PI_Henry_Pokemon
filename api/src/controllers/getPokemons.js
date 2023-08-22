// Importando los módulos y modelos necesarios
const { Pokemon, Type } = require('../db'); // Importa los modelos Pokemon y Type de la base de datos
const axios = require('axios'); // Importa la librería Axios para hacer solicitudes HTTP

// Función asincrónica para obtener los Pokémon de la API
const getPokemonApi = async () => {
  const arrPockemon = []; // Un arreglo para almacenar los Pokémon de la API
  const pockemons = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60')).data.results; // Obtiene los primeros 60 Pokémon de la API

  for (let pokemon of pockemons) {
    const el = (await axios.get(pokemon.url)).data; // Obtiene los detalles de un Pokémon específico de la API

    // Crea un objeto con información del Pokémon y lo agrega al arreglo
    arrPockemon.push({
      id: el.id,
      name: el.name,
      image: el.sprites.other.dream_world.front_default,
      life: el.stats[0].base_stat,
      attack: el.stats[1].base_stat,
      defense: el.stats[2].base_stat,
      speed: el.stats[5].base_stat,
      height: el.height,
      weight: el.weight,
      types: el.types.map(type => type.type.name),
    });
  };
  return arrPockemon; // Retorna el arreglo de Pokémon
}

// Función asincrónica para obtener Pokémon de la base de datos
const getPokemonsDb = async () => {
  const pokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
    }
  });
  return pokemons; // Retorna los Pokémon de la base de datos
}

// Función asincrónica para obtener todos los Pokémon (de la API y de la base de datos)
const getAllPokemons = async () => {
  const apiPokemons = await getPokemonApi(); // Obtiene Pokémon de la API
  const dbPokemons = await getPokemonsDb(); // Obtiene Pokémon de la base de datos

  return apiPokemons.concat(dbPokemons); // Combina los Pokémon de la API y de la base de datos

}

const getPokemonNames = async (nameContains) => {
  const allPokemons = await getAllPokemons();

  const filtered = allPokemons.filter(p => {
    return p.name.toLowerCase().includes(nameContains.toLowerCase());
  });

  return filtered;
};


// Función asincrónica para obtener un Pokémon por su ID (ya sea de la API o de la base de datos)
const getPokemonById = async (id) => {
  if (isNaN(id)) {
    return await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ['name'],
      }
    }); // Obtiene un Pokémon de la base de datos por su ID
  }

  const pokeApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data; // Obtiene un Pokémon de la API por su ID
  return {
    id: pokeApi.id,
    name: pokeApi.name,
    image: pokeApi.sprites.other.dream_world.front_default,
    life: pokeApi.stats[0].base_stat,
    attack: pokeApi.stats[1].base_stat,
    defense: pokeApi.stats[2].base_stat,
    speed: pokeApi.stats[5].base_stat,
    height: pokeApi.height,
    weight: pokeApi.weight,
    types: pokeApi.types.map(type => type.type.name),
  };
};

// Función asincrónica para crear un nuevo Pokémon en la base de datos
const createPokemonDB = async (id, name, image, life, attack, defense, speed, height, weight) => {
  return await Pokemon.create({
    id,
    name,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight
  });
};

// Exporta las funciones para usarlas en otros archivos
module.exports = {
  getAllPokemons,
  getPokemonById,
  createPokemonDB,
  getPokemonNames
}
