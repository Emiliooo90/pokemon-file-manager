//Componente tabla alternativo para mostrar datos de Pokémon
const PokemonTable = ({ pokemon }) => {
    if (!pokemon) return null;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold text-gray-800">📊 Detalles del Pokémon</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Nombre
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                {pokemon.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                ID
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                #{pokemon.id.toString().padStart(3, '0')}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Tipos
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {pokemon.types.join(', ')}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Altura
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {pokemon.height}m
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Peso
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {pokemon.weight}kg
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Habilidades
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <div className="space-y-1">
                                    {pokemon.abilities.map((ability, index) => (
                                        <div key={index} className="flex items-center">
                                            <span className="capitalize">
                                                {ability.name.replace('-', ' ')}
                                            </span>
                                            {ability.isHidden && (
                                                <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                                                    Oculta
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PokemonTable;