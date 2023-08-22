const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllPokemon } = require('./get/getAllPokemon')
const {  getPokemonsByName } = require('./get/getPokemonsByName')
const { getPokemonsById } = require('./get/getPokemonsById')
const {postPokemon } = require('./post/postPokemon')
const { getTypePokemon } = require('./get/getTypePokemon')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Ruta para el llamado de todos los pokemons y caracteres
router.get('/pokemons', getAllPokemon);

// Ruta para buscar un Pokémon por nombre
router.get('/pokemons/name/', getPokemonsByName);

// Ruta Por ID de API y DB
router.get('/pokemons/:id', getPokemonsById);

// Ruta Por Tipos
router.get('/types', getTypePokemon);

// Ruta para crear un nuevo Pokémon
router.post('/pokemons', postPokemon);

module.exports = router;