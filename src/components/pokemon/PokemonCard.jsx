//Componente tarjeta para mostrar detalles de los pokemones

const PokemonCard = ({ pokemon }) => {
    if (!pokemon) return null;

    //Obtiene el color según el tipo de Pokémon

    const getTypeColor = (type) => {
        const colors = {
            normal: 'bg-gray-400',
            fire: 'bg-red-500',
            water: 'bg-blue-500',
            electric: 'bg-yellow-400',
            grass: 'bg-green-500',
            ice: 'bg-blue-200',
            fighting: 'bg-red-700',
            poison: 'bg-purple-500',
            ground: 'bg-yellow-600',
            flying: 'bg-indigo-400',
            psychic: 'bg-pink-500',
            bug: 'bg-green-400',
            rock: 'bg-yellow-800',
            ghost: 'bg-purple-700',
            dragon: 'bg-indigo-700',
            dark: 'bg-gray-800',
            steel: 'bg-gray-500',
            fairy: 'bg-pink-300'
        };
        return colors[type] || 'bg-gray-400';
    };

    //Obtiene el color de la barra de estadística
    const getStatColor = (value) => {
        if (value >= 100) return 'bg-green-500';
        if (value >= 70) return 'bg-yellow-500';
        if (value >= 40) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header con imagen */}
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 text-white text-center">
                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-32 h-32 mx-auto mb-4 drop-shadow-lg"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/128x128?text=Pokemon';
                    }}
                />
                <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
                <p className="text-blue-100">#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>

            {/* Información básica */}
            <div className="p-6">
                {/* Tipos */}
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Tipos</h3>
                    <div className="flex flex-wrap gap-2">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className={`px-3 py-1 rounded-full text-white text-sm font-medium capitalize ${getTypeColor(type)}`}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Medidas */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{pokemon.height}m</p>
                        <p className="text-sm text-gray-600">Altura</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{pokemon.weight}kg</p>
                        <p className="text-sm text-gray-600">Peso</p>
                    </div>
                </div>

                {/* Habilidades */}
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Habilidades</h3>
                    <div className="space-y-1">
                        {pokemon.abilities.map((ability, index) => (
                            <div key={index} className="flex items-center">
                                <span className="capitalize text-sm">
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
                </div>

                {/* Estadísticas */}
                <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Estadísticas Base</h3>
                    <div className="space-y-2">
                        {pokemon.stats.map((stat) => (
                            <div key={stat.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="capitalize font-medium">
                                        {stat.name.replace('-', ' ')}
                                    </span>
                                    <span className="font-bold">{stat.value}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${getStatColor(stat.value)}`}
                                        style={{ width: `${Math.min((stat.value / 150) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;