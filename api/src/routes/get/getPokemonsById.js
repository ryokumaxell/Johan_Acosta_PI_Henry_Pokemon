const { getAllPokemons } = require("../../controllers/getPokemons"); // Importa la función para obtener todos los Pokémon

// Función para obtener un Pokémon por su ID
const getPokemonsById = async (req, res) => {
    const { id } = req.params; // Obtiene el ID desde los parámetros de la solicitud
    const allPokemons = await getAllPokemons(); // Obtiene todos los Pokémon

    if (Array.isArray(allPokemons)) {
        // Filtra el Pokémon por su ID
        const pokemonById = allPokemons.find(p => p.id == id);

        if (pokemonById) {
            res.status(200).json(pokemonById); // Retorna el Pokémon si se encuentra
        } else {
            res.status(404).json({ message: "No se encontró el Pokémon" }); // Retorna un mensaje si no se encuentra el Pokémon
        }
    } else {
        res.status(500).json({ message: "Error interno del servidor" }); // Retorna un mensaje de error interno
    }
};

module.exports = {
    getPokemonsById,
};