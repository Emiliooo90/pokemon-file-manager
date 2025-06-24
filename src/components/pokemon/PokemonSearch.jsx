import { useState, useEffect, useCallback } from 'react';
import { FaMagnifyingGlass, FaXmark, FaLightbulb } from 'react-icons/fa6';


//Componente de búsqueda con autosugerencias
 
const PokemonSearch = ({ onSearch, suggestions, loading, onClear }) => {
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Función de búsqueda cpn debounce para evitar re-renders infinitos que afectan al rendimiento de la aplicación web
    const debouncedSearch = useCallback((searchQuery) => {
        if (searchQuery.length >= 2) {
            onSearch(searchQuery);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [onSearch]);

    // Debounce para la búsqueda - eliminado onSearch de las dependencias
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            debouncedSearch(query);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, debouncedSearch]);

    const handleSuggestionClick = (pokemonName) => {
        setQuery(pokemonName);
        setShowSuggestions(false);
        onSearch(pokemonName);
    };

    const handleClear = () => {
        setQuery('');
        setShowSuggestions(false);
        onClear();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <FaMagnifyingGlass className="text-blue-600" />
                Búsqueda de Pokémon
            </h2>

            <div className="relative">
                <div className="flex">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar Pokémon por nombre..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {query && (
                        <button
                            onClick={handleClear}
                            className="px-4 py-3 bg-gray-200 border border-l-0 border-gray-300 hover:bg-gray-300 transition-colors flex items-center"
                            title="Limpiar búsqueda"
                        >
                            <FaXmark />
                        </button>
                    )}
                    <button
                        onClick={() => query && onSearch(query)}
                        disabled={!query || loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Buscando...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <FaMagnifyingGlass />
                                Buscar
                            </span>
                        )}
                    </button>
                </div>

                {/* Sugerencias */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg max-h-60 overflow-y-auto">
                        {suggestions.map((pokemon, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(pokemon.name)}
                                className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors capitalize"
                            >
                                {pokemon.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Ayuda */}
            <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                <strong>Tip:</strong> Escribe al menos 2 caracteres para ver sugerencias
            </div>
        </div>
    );
};

export default PokemonSearch;