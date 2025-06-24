//Servicio para manejar operaciones de localStorage

export class LocalStorageService {
    //Guarda datos en localStorage
    //@param {string} key - Clave del localStorage
    //@param {any} data - Datos a guardar

    static save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    //Obtiene datos del localStorage
    //@param {string} key - Clave del localStorage
    //@param {any} defaultValue - Valor por defecto si no existe
    //@returns {any} Datos del localStorage

    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    }

    //Elimina un elemento del localStorage
    //@param {string} key - Clave a eliminar

    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }

    //Limpia todo el localStorage

    static clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
}