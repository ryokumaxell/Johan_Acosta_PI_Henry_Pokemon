// Importa la función getAllTypes desde el controlador getType
const { getAllTypes } = require('../../controllers/getType');

// Define una función asincrónica llamada getTypePokemon que manejará la solicitud HTTP
const getTypePokemon = async (req, res) => {
  try {
    // Llama a la función getAllTypes para obtener los tipos de Pokémon
    const types = await getAllTypes();

    // Verifica si se obtuvieron tipos
    if (types.length > 0) {
      // Si hay tipos, responde con un código de estado 200 (OK) y los tipos en formato JSON
      res.status(200).json(types);
    } else {
      // Si no hay tipos, responde con un código de estado 404 (No encontrado) y un mensaje de error
      res.status(404).json({ message: "No se encontraron tipos de Pokémon." });
    }
  } catch (error) {
    // En caso de un error en el servidor, responde con un código de estado 500 (Error interno del servidor) y un mensaje de error
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Exporta la función getTypePokemon para que pueda ser utilizada en otras partes de la aplicación
module.exports = {
  getTypePokemon,
};
