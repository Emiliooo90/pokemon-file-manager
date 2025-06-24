import { pokemonAPI } from './api.interceptors';

//Servicio para interactuar con la PokeAPI

export class PokemonService {
    // Cache para evitar duplicados en las solicitudes
    static requestCache = new Map();
    static activeRequests = new Map();

    //Busca Pokémon por nombre con autosugerencias
    //@param {string} query - Término de búsqueda
    //@returns {Promise<Array>} Lista de sugerencias

    static async searchPokemon(query) {
        try {
            if (!query || query.length < 2) return [];

            const normalizedQuery = query.toLowerCase().trim();
            const cacheKey = `search_${normalizedQuery}`;

            // Comprobar cache primero
            if (this.requestCache.has(cacheKey)) {
                return this.requestCache.get(cacheKey);
            }

            // Comprobar si la solicitud ya está en progreso
            if (this.activeRequests.has(cacheKey)) {
                return this.activeRequests.get(cacheKey);
            }

            // Crear promesa de solicitud
            const requestPromise = this._performSearch(normalizedQuery, cacheKey);
            this.activeRequests.set(cacheKey, requestPromise);

            const result = await requestPromise;
            
            // Limpiar solicitud activa
            this.activeRequests.delete(cacheKey);
            
            return result;
        } catch (error) {
            console.error('Error searching Pokemon:', error);
            return [];
        }
    }

    //Realiza la solicitud de búsqueda
    //@private

    static async _performSearch(query, cacheKey) {
        const response = await pokemonAPI.get('pokemon?limit=1000');
        const allPokemon = response.data.results;

        // Filtrar por query
        const results = allPokemon
            .filter(pokemon =>
                pokemon.name.toLowerCase().includes(query)
            )
            .slice(0, 10); // Limitar a 10 sugerencias

        // Cache los resultados para 5 minutos
        this.requestCache.set(cacheKey, results);
        setTimeout(() => {
            this.requestCache.delete(cacheKey);
        }, 5 * 60 * 1000);

        return results;
    }

    //Obtiene detalles completos de un Pokémon
    //@param {string} nameOrId - Nombre o ID del Pokémon
    //@returns {Promise<Object>} Datos del Pokémon

    static async getPokemonDetails(nameOrId) {
        try {
            const normalizedName = nameOrId.toLowerCase().trim();
            const cacheKey = `details_${normalizedName}`;

            // Comprobar cache primero
            if (this.requestCache.has(cacheKey)) {
                return this.requestCache.get(cacheKey);
            }

            // Comprobar si la solicitud ya está en progreso
            if (this.activeRequests.has(cacheKey)) {
                return this.activeRequests.get(cacheKey);
            }

            // Crear promesa de solicitud
            const requestPromise = this._fetchPokemonDetails(normalizedName, cacheKey);
            this.activeRequests.set(cacheKey, requestPromise);

            const result = await requestPromise;
            
            // Limpiar solicitud activa
            this.activeRequests.delete(cacheKey);
            
            return result;
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
            throw new Error('Pokémon no encontrado');
        }
    }

    //Realiza la solicitud de detalles de un Pokémon
    //@private

    static async _fetchPokemonDetails(nameOrId, cacheKey) {
        const response = await pokemonAPI.get(`pokemon/${nameOrId}`);
        const pokemon = response.data;

        // Formatear datos para el frontend
        const result = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other['official-artwork'].front_default ||
                pokemon.sprites.front_default,
            types: pokemon.types.map(type => type.type.name),
            height: pokemon.height / 10, // Convertir a metros
            weight: pokemon.weight / 10, // Convertir a kg
            abilities: pokemon.abilities.map(ability => ({
                name: ability.ability.name,
                isHidden: ability.is_hidden
            })),
            stats: pokemon.stats.map(stat => ({
                name: stat.stat.name,
                value: stat.base_stat
            }))
        };

        // Cache los resultados para 10 minutos
        this.requestCache.set(cacheKey, result);
        setTimeout(() => {
            this.requestCache.delete(cacheKey);
        }, 10 * 60 * 1000);

        return result;
    }

    //Limpiar cache manualmente si es necesario
    //@static

    static clearCache() {
        this.requestCache.clear();
        this.activeRequests.clear();
    }
}