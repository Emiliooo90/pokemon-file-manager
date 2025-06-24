import { useFileManager } from '../hooks/useFileManager';
import Layout from '../components/common/Layout';
import FileUploader from '../components/files/FileUploader';
import FileTable from '../components/files/FileTable';

//Página principal para gestión de archivos

const FilesPage = () => {
    const { files, addFiles, removeFile, updateFileMetadata, clearFiles } = useFileManager();

    //Maneja la carga de nuevos archivos

    const handleFileUpload = (fileList) => {
        addFiles(fileList);
    };

    //Maneja la eliminación de archivos

    const handleDeleteFile = (fileId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
            removeFile(fileId);
        }
    };

    //Maneja la actualización de metadata

    const handleUpdateFile = (fileId, newMetadata) => {
        updateFileMetadata(fileId, newMetadata);
    };

    //Limpia todos los archivos

    const handleClearAll = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar todos los archivos?')) {
            clearFiles();
        }
    };

    return (
        <Layout currentView="files">
            <div className="space-y-8">
                {/* Header de la página */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📁 Gestión de Archivos</h1>
                        <p className="text-gray-600 mt-1">
                            Carga, visualiza y gestiona la metadata de tus archivos
                        </p>
                    </div>

                    {files.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            🗑️ Limpiar Todo
                        </button>
                    )}
                </div>

                {/* Componente de carga */}
                <FileUploader onFilesUploaded={handleFileUpload} />

                {/* Tabla de archivos */}
                <FileTable
                    files={files}
                    onDeleteFile={handleDeleteFile}
                    onUpdateFile={handleUpdateFile}
                />

                {/* Estadísticas */}
                {files.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-bold text-blue-600">{files.length}</p>
                                <p className="text-sm text-gray-600">Archivos Total</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">
                                    {(files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(2)} MB
                                </p>
                                <p className="text-sm text-gray-600">Tamaño Total</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-purple-600">
                                    {new Set(files.map(file => file.type.split('/')[0])).size}
                                </p>
                                <p className="text-sm text-gray-600">Tipos Diferentes</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default FilesPage;