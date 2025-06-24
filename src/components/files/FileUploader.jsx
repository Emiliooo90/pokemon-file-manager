import { useState } from 'react';

//Componente para cargar archivos (uno individual y múltiples)

const FileUploader = ({ onFilesUploaded }) => {
    const [dragActive, setDragActive] = useState(false);

    //Maneja la carga de archivo individual

    const handleSingleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFilesUploaded([file]);
            // Limpiar input
            event.target.value = ''; 
        }
    };

    //Maneja la carga de múltiples archivos
    const handleMultipleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            onFilesUploaded(files);
            event.target.value = ''; // Limpiar input
        }
    };

    //Maneja eventos de drag and drop

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const files = Array.from(e.dataTransfer.files);
            onFilesUploaded(files);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📁 Carga de Archivos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Carga de archivo individual */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Archivo Individual</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                            type="file"
                            onChange={handleSingleFileUpload}
                            className="hidden"
                            id="single-file"
                            accept="*/*"
                        />
                        <label
                            htmlFor="single-file"
                            className="cursor-pointer flex flex-col items-center space-y-2"
                        >
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="text-sm text-gray-600">Seleccionar un archivo</span>
                        </label>
                    </div>
                </div>

                {/* Carga de múltiples archivos */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Múltiples Archivos</h3>
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-400'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            onChange={handleMultipleFileUpload}
                            className="hidden"
                            id="multiple-files"
                            multiple
                            accept="*/*"
                        />
                        <label
                            htmlFor="multiple-files"
                            className="cursor-pointer flex flex-col items-center space-y-2"
                        >
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm text-gray-600">
                                Seleccionar múltiples archivos
                            </span>
                            <span className="text-xs text-gray-500">
                                o arrastra y suelta aquí
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploader;