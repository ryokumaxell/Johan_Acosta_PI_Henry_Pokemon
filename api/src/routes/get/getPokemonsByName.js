// Importar la función getAllPokemons desde el controlador
const { getPokemonNames } = require("../../controllers/getPokemons"); 

const getPokemonsByName = async (req, res) => {
  const nameContains = req.query.name;

  if (!nameContains) {
    return res.status(400).json({ message: "Debes proporcionar caracteres a buscar en el nombre" });
  }

  const pokemons = await getPokemonNames(nameContains);

  if (pokemons.length === 0) {
    return res.status(404).json({ message: "No se encontraron Pokémones que contengan esos caracteres" });
  }

  res.status(200).json(pokemons);
};


// Exportar la función para usarla en las rutas
module.exports = {
  getPokemonsByName  
};