import { useLocalStorage } from './useLocalStorage';

//Hook personalizado para manejar archivos

export const useFileManager = () => {
    const [files, setFiles] = useLocalStorage('uploadedFiles', []);

    //Añade archivos a la lista
    //@param {FileList} fileList - Lista de archivos a añadir
    const addFiles = (fileList) => {
        const newFiles = Array.from(fileList).map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString(),
            lastModified: new Date(file.lastModified).toISOString()
        }));

        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    //Elimina un archivo por ID
    //@param {string} fileId - ID del archivo a eliminar
    const removeFile = (fileId) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    };

    //Actualiza metadata de un archivo
    //@param {string} fileId - ID del archivo
    //@param {Object} newMetadata - Nueva metadata
    const updateFileMetadata = (fileId, newMetadata) => {
        setFiles(prevFiles =>
            prevFiles.map(file =>
                file.id === fileId
                    ? { ...file, ...newMetadata }
                    : file
            )
        );
    };

    //Limpia todos los archivos
    const clearFiles = () => {
        setFiles([]);
    };

    return {
        files,
        addFiles,
        removeFile,
        updateFileMetadata,
        clearFiles
    };
};