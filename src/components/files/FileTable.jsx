import { useState } from 'react';
import { FaImage, FaVideo, FaMusic, FaFileLines, FaFileZipper, FaFolder, FaChartColumn, FaPencil, FaTrash } from 'react-icons/fa6';
import MetadataEditor from './MetadataEditor';

//Componente tabla para mostrar metadata de archivos
const FileTable = ({ files, onDeleteFile, onUpdateFile }) => {
    const [editingFile, setEditingFile] = useState(null);

    //Formatea el tamaño del archivo
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    //Formatea la fecha
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('es-ES');
    };

    //Obtiene el icono según el tipo de archivo
    const getFileIcon = (mimeType) => {
        if (mimeType.startsWith('image/')) return <FaImage className="text-green-500" />;
        if (mimeType.startsWith('video/')) return <FaVideo className="text-red-500" />;
        if (mimeType.startsWith('audio/')) return <FaMusic className="text-purple-500" />;
        if (mimeType.includes('pdf')) return <FaFileLines className="text-red-600" />;
        if (mimeType.includes('text')) return <FaFileLines className="text-blue-500" />;
        if (mimeType.includes('zip') || mimeType.includes('rar')) return <FaFileZipper className="text-orange-500" />;
        return <FaFolder className="text-yellow-500" />;
    };

    if (files.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <FaChartColumn className="text-blue-600" />
                    Metadata de Archivos
                </h2>
                <div className="text-center py-8 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No hay archivos cargados</p>
                    <p className="text-sm">Sube algunos archivos para ver su metadata aquí</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaChartColumn className="text-blue-600" />
                    Metadata de Archivos
                </h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {files.length} archivo{files.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Tabla responsive */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Archivo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tamaño
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tipo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha de Carga
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {files.map((file) => (
                            <tr key={file.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">{getFileIcon(file.type)}</span>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {file.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatFileSize(file.size)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                        {file.type || 'Desconocido'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(file.uploadDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => setEditingFile(file)}
                                        className="text-blue-600 hover:text-blue-900 mr-4 flex items-center gap-1"
                                    >
                                        <FaPencil />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDeleteFile(file.id)}
                                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                    >
                                        <FaTrash />
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingFile && (
                <MetadataEditor
                    file={editingFile}
                    onSave={(updatedFile) => {
                        onUpdateFile(editingFile.id, updatedFile);
                        setEditingFile(null);
                    }}
                    onCancel={() => setEditingFile(null)}
                />
            )}
        </div>
    );
};

export default FileTable;