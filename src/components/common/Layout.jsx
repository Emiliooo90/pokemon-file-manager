import Navigation from './Navigation';

//Componente Layout principal de la aplicación
const Layout = ({ children, currentView }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation currentView={currentView} />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;