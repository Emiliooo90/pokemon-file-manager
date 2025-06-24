import { useState, useCallback, useRef } from 'react';
import { PokemonService } from '../services/pokemon.service';

//Hook personalizado para interactuar con la PokeAPI

export const usePokemonAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    
    // Refs para rastrear las operaciones actuales y evitar llamadas duplicadas
    const currentSearchRef = useRef(null);
    const currentSelectionRef = useRef(null);
    const searchCacheRef = useRef(new Map());

    //Busca sugerencias de Pokémon con cache y deduplicación
    //@param {string} query - Término de búsqueda

    const searchSuggestions = useCallback(async (query) => {
        const normalizedQuery = query.toLowerCase().trim();
        
        // Evitar búsquedas duplicadas
        if (currentSearchRef.current === normalizedQuery) {
            return;
        }
        
        // Comprobar cache primero
        if (searchCacheRef.current.has(normalizedQuery)) {
            setSuggestions(searchCacheRef.current.get(normalizedQuery));
            return;
        }

        currentSearchRef.current = normalizedQuery;

        try {
            setLoading(true);
            setError(null);

            const results = await PokemonService.searchPokemon(normalizedQuery);
            
            // Only update if this is still the current search
            if (currentSearchRef.current === normalizedQuery) {
                setSuggestions(results);
                // Cache the results
                searchCacheRef.current.set(normalizedQuery, results);
                
                // Limit cache size to prevent memory leaks
                if (searchCacheRef.current.size > 50) {
                    const firstKey = searchCacheRef.current.keys().next().value;
                    searchCacheRef.current.delete(firstKey);
                }
            }
        } catch (err) {
            if (currentSearchRef.current === normalizedQuery) {
                setError('Error al buscar Pokémon');
                setSuggestions([]);
            }
        } finally {
            if (currentSearchRef.current === normalizedQuery) {
                setLoading(false);
                currentSearchRef.current = null;
            }
        }
    }, []);

    //Selecciona un Pokémon y obtiene sus detalles con deduplicación
    //@param {string} pokemonName - Nombre del Pokémon

    const selectPokemon = useCallback(async (pokemonName) => {
        const normalizedName = pokemonName.toLowerCase().trim();
        
        // Evitar selecciones duplicadas
        if (currentSelectionRef.current === normalizedName) {
            return;
        }
        
        // No buscar si ya tenemos este Pokémon seleccionado
        if (selectedPokemon?.name === normalizedName) {
            return;
        }

        currentSelectionRef.current = normalizedName;

        try {
            setLoading(true);
            setError(null);

            const pokemon = await PokemonService.getPokemonDetails(normalizedName);
            
            // Solo actualizar si esta es la selección actual
            if (currentSelectionRef.current === normalizedName) {
                setSelectedPokemon(pokemon);
                setSuggestions([]); // Limpiar sugerencias
            }
        } catch (err) {
            if (currentSelectionRef.current === normalizedName) {
                setError(err.message);
                setSelectedPokemon(null);
            }
        } finally {
            if (currentSelectionRef.current === normalizedName) {
                setLoading(false);
                currentSelectionRef.current = null;
            }
        }
    }, [selectedPokemon?.name]);

    //Limpia la selección actual

    const clearSelection = useCallback(() => {
        // Cancelar cualquier operación en curso
        currentSearchRef.current = null;
        currentSelectionRef.current = null;
        
        setSelectedPokemon(null);
        setSuggestions([]);
        setError(null);
        setLoading(false);
    }, []);

    return {
        loading,
        error,
        suggestions,
        selectedPokemon,
        searchSuggestions,
        selectPokemon,
        clearSelection
    };
};