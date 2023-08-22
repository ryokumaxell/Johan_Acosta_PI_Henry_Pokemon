const { Pokemon, Type } = require("../../db");

// Función auxiliar para crear un Pokémon y sus tipos asociados
const createPokemonWithTypes = async (pokemonData) => {
    const { name, types, ...otherData } = pokemonData;

    // Convertir el nombre del Pokémon a minúsculas
    const nameLower = name.trim().toLowerCase();
    const typesLower = types?.map((type) => type.toLowerCase());

    // Crear un nuevo registro de Pokémon en la base de datos
    const createdPoke = await Pokemon.create({
        name: nameLower,
        ...otherData
    });

    // Crear y asociar los tipos al Pokémon creado
    typesLower.forEach(async (typeName) => {
        const [type] = await Type.findOrCreate({
            where: { name: typeName },
            defaults: { name: typeName },
        });
    
        // Crear la relación en la tabla intermedia
        await createdPoke.addType(type);
    });
    
    return createdPoke;
};

const postPokemon = async (req, res) => {
    const pokemonData = req.body;

    try {
        const newPokemon = await createPokemonWithTypes(pokemonData);

        res.status(200).json(newPokemon);
    } catch (error) {
        console.error("Error en la creación de Pokémon:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    postPokemon,
};
