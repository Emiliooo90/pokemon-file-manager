import { useState } from 'react';
import { LocalStorageService } from '../services/localStorage.service';

//Hook personalizado para manejar localStorage

//@param {string} key - Clave del localStorage
//@param {any} initialValue - Valor inicial
//@returns {[any, Function]} Estado y función para actualizarlo

export const useLocalStorage = (key, initialValue) => {
    // Obtener valor inicial del localStorage
    const [storedValue, setStoredValue] = useState(() => {
        return LocalStorageService.get(key, initialValue);
    });

    // Función para actualizar el valor
    const setValue = (value) => {
        try {
            // Permitir que value sea una función como en useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            LocalStorageService.save(key, valueToStore);
        } catch (error) {
            console.error('Error setting localStorage value:', error);
        }
    };

    return [storedValue, setValue];
};