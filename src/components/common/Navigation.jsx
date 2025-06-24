import { Link } from 'react-router-dom';


//Componente de navegación entre vistas
const Navigation = ({ currentView }) => {
    const navItems = [
        { path: '/files', label: 'Gestión de Archivos', view: 'files' },
        { path: '/pokemon', label: 'Búsqueda Pokémon', view: 'pokemon' }
    ];

    return (
        <nav className="bg-blue-600 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-white text-xl font-bold">
                        File & Pokémon Manager
                    </Link>

                    <div className="flex space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-md transition-colors ${currentView === item.view
                                        ? 'bg-blue-800 text-white'
                                        : 'text-blue-100 hover:bg-blue-500'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;