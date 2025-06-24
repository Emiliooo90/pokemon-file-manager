//Utilidades para manejo de archivos

//Formatea el tamaño de archivo en formato legible
//@param {number} bytes - Tamaño en bytes
//@param {number} decimals - Número de decimales
//@returns {string} Tamaño formateado

export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

//Obtiene el tipo de archivo basado en su extensión
//@param {string} filename - Nombre del archivo
//@returns {string} Tipo de archivo

export const getFileTypeFromName = (filename) => {
    const extension = filename.split('.').pop()?.toLowerCase();

    const typeMap = {
        // Imágenes
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
        bmp: 'image/bmp',

        // Documentos
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

        // Texto
        txt: 'text/plain',
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        json: 'application/json',
        xml: 'text/xml',

        // Audio
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        flac: 'audio/flac',
        aac: 'audio/aac',

        // Video
        mp4: 'video/mp4',
        avi: 'video/x-msvideo',
        mov: 'video/quicktime',
        wmv: 'video/x-ms-wmv',
        flv: 'video/x-flv',

        // Archivos comprimidos
        zip: 'application/zip',
        rar: 'application/x-rar-compressed',
        '7z': 'application/x-7z-compressed',
        tar: 'application/x-tar',
        gz: 'application/gzip'
    };

    return typeMap[extension] || 'application/octet-stream';
};

//Valida si un archivo es de tipo imagen
//@param {string} mimeType - Tipo MIME del archivo
//@returns {boolean} Es imagen

export const isImageFile = (mimeType) => {
    return mimeType.startsWith('image/');
};

//Valida si un archivo es de tipo video
//@param {string} mimeType - Tipo MIME del archivo
//@returns {boolean} Es video

export const isVideoFile = (mimeType) => {
    return mimeType.startsWith('video/');
};

//Valida si un archivo es de tipo audio
//@param {string} mimeType - Tipo MIME del archivo
//@returns {boolean} Es audio

export const isAudioFile = (mimeType) => {
    return mimeType.startsWith('audio/');
};

//Genera un ID único para archivos
//@returns {string} ID único

export const generateFileId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

//Valida el tamaño máximo de archivo
//@param {number} fileSize - Tamaño del archivo en bytes
//@param {number} maxSizeMB - Tamaño máximo en MB
//@returns {boolean} Es válido

export const validateFileSize = (fileSize, maxSizeMB = 10) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return fileSize <= maxSizeBytes;
};

//Obtiene información resumida de archivos
//@param {Array} files - Array de archivos
//@returns {Object} Estadísticas

export const getFilesStats = (files) => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const typeCount = {};

    files.forEach(file => {
        const mainType = file.type.split('/')[0] || 'unknown';
        typeCount[mainType] = (typeCount[mainType] || 0) + 1;
    });

    return {
        totalFiles: files.length,
        totalSize,
        totalSizeFormatted: formatFileSize(totalSize),
        typeDistribution: typeCount,
        averageSize: files.length > 0 ? totalSize / files.length : 0
    };
};