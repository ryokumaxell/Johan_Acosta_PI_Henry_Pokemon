const { Type } = require('../db');
const axios = require('axios');

const getTypesApi = async () => {
    const types = (await axios.get('https://pokeapi.co/api/v2/type')).data.results;
    const typesArr = types.map(type => type.name);
    return typesArr;
}; 

const getTypesDB = async () => {
    return await Type.findAll();
};


const getAllTypes = async () => {
    const typesApi = await getTypesApi();
    const typesDB = await getTypesDB();
    const types = typesApi.concat(typesDB);
    return types;
};


module.exports = {
    getAllTypes,
}