import { useState, useCallback } from 'react';
import { usePokemonAPI } from '../hooks/usePokemonAPI';
import Layout from '../components/common/Layout';
import PokemonSearch from '../components/pokemon/PokemonSearch';
import PokemonCard from '../components/pokemon/PokemonCard';
import PokemonTable from '../components/pokemon/PokemonTable';
import LoadingSpinner from '../components/common/LoadingSpinner';

//Página principal para búsqueda de Pokémon

const PokemonPage = () => {
    const [viewMode, setViewMode] = useState('card');
    const [lastSearchQuery, setLastSearchQuery] = useState('');
    const {
        loading,
        error,
        suggestions,
        selectedPokemon,
        searchSuggestions,
        selectPokemon,
        clearSelection
    } = usePokemonAPI();

    //Maneja la búsqueda de Pokémon con memoización para evitar loops infinitos

    const handleSearch = useCallback(async (query) => {
        // Evitar búsquedas duplicadas
        if (query === lastSearchQuery && query.length >= 2) {
            return;
        }
        
        setLastSearchQuery(query);

        // Devolver temprano para consultas cortas
        if (query.length < 2) {
            return;
        }

        try {
            // Comprobar coincidencia exacta en las sugerencias actuales primero
            const exactMatch = suggestions.find(s => 
                s.name.toLowerCase() === query.toLowerCase()
            );

            if (exactMatch) {
                // Selección directa para coincidencia exacta
                await selectPokemon(exactMatch.name);
            } else {
                // Para consultas que podrían ser nombres de Pokémon completos, intentar fetch directo primero
                const trimmedQuery = query.trim().toLowerCase();
                
                // Si parece un nombre completo (sin espacios, longitud razonable)
                if (trimmedQuery.length >= 3 && !trimmedQuery.includes(' ')) {
                    try {
                        await selectPokemon(trimmedQuery);
                    } catch {
                        // Si el fetch directo falla, obtener sugerencias
                        await searchSuggestions(trimmedQuery);
                    }
                } else {
                    // Para consultas más cortas o parciales, obtener sugerencias
                    await searchSuggestions(trimmedQuery);
                }
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    }, [lastSearchQuery, suggestions, selectPokemon, searchSuggestions]);

    // Limpiar búsqueda con restablecimiento

    const handleClear = useCallback(() => {
        setLastSearchQuery('');
        clearSelection();
    }, [clearSelection]);

    return (
        <Layout currentView="pokemon">
            <div className="space-y-8">
                {/* Header de la página */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🐾 Búsqueda de Pokémon</h1>
                        <p className="text-gray-600 mt-1">
                            Encuentra y explora información detallada de Pokémon
                        </p>
                    </div>

                    {/* Selector de vista */}
                    {selectedPokemon && (
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('card')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'card'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                🃏 Tarjeta
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'table'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                📊 Tabla
                            </button>
                        </div>
                    )}
                </div>

                {/* Componente de búsqueda */}
                <PokemonSearch
                    onSearch={handleSearch}
                    suggestions={suggestions}
                    loading={loading}
                    onClear={handleClear}
                />

                {/* Spinner de carga */}
                {loading && <LoadingSpinner />}

                {/* Mensaje de error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* Resultados */}
                {selectedPokemon && !loading && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            {viewMode === 'card' ? (
                                <PokemonCard pokemon={selectedPokemon} />
                            ) : (
                                <PokemonTable pokemon={selectedPokemon} />
                            )}
                        </div>

                        {/* Información adicional */}
                        <div className="space-y-6">
                            {/* Tips de búsqueda */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h3 className="font-semibold text-yellow-800 mb-2">💡 Tips de Búsqueda</h3>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• Puedes buscar por nombre en inglés (ej: "pikachu")</li>
                                    <li>• Las sugerencias aparecen mientras escribes</li>
                                    <li>• Intenta con: pikachu, charizard, mew, lucario</li>
                                </ul>
                            </div>

                            {/* Datos curiosos */}
                            {selectedPokemon && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-800 mb-2">📈 Datos Curiosos</h3>
                                    <div className="text-sm text-blue-700 space-y-2">
                                        <p>
                                            <strong>Estadística más alta:</strong>{' '}
                                            {selectedPokemon.stats.reduce((max, stat) =>
                                                stat.value > max.value ? stat : max
                                            ).name.replace('-', ' ')} ({selectedPokemon.stats.reduce((max, stat) =>
                                                stat.value > max.value ? stat : max
                                            ).value})
                                        </p>
                                        <p>
                                            <strong>Total de estadísticas:</strong>{' '}
                                            {selectedPokemon.stats.reduce((sum, stat) => sum + stat.value, 0)}
                                        </p>
                                        <p>
                                            <strong>Tipo principal:</strong>{' '}
                                            <span className="capitalize">{selectedPokemon.types[0]}</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Estado inicial */}
                {!selectedPokemon && !loading && !error && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            ¡Busca tu Pokémon favorito!
                        </h3>
                        <p className="text-gray-500">
                            Escribe el nombre de un Pokémon para ver su información detallada
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PokemonPage;