import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FilesPage from './pages/FilesPage';
import PokemonPage from './pages/PokemonPage';
import { ROUTES } from './utils/constants';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Ruta principal redirige a archivos */}
                    <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.FILES} replace />} />

                    {/* Página de gestión de archivos */}
                    <Route path={ROUTES.FILES} element={<FilesPage />} />

                    {/* Página de búsqueda de Pokémon */}
                    <Route path={ROUTES.POKEMON} element={<PokemonPage />} />

                    {/* Ruta 404 - redirige a archivos */}
                    <Route path="*" element={<Navigate to={ROUTES.FILES} replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;