const { getAllPokemons } = require("../../controllers/getPokemons"); // Importa la función para obtener todos los Pokémon

// Función para obtener todos los Pokémon
const getAllPokemon = async (req, res) => {
    const allPokemons = await getAllPokemons(); // Obtiene todos los Pokémon

    if (Array.isArray(allPokemons)) {
        if (allPokemons.length > 0) {
            res.status(200).json(allPokemons); // Retorna todos los Pokémon si hay al menos uno
        } else {
            res.status(404).json({ message: "No se encontraron Pokémones." }); // Retorna un mensaje si no hay Pokémon
        }
    } else {
        res.status(500).json({ message: "Error interno del servidor" }); // Retorna un mensaje de error interno
    }
};

module.exports = {
    getAllPokemon,
};
