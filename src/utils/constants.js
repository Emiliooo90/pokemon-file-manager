//Constantes de la aplicación

// Claves para localStorage
export const STORAGE_KEYS = {
    UPLOADED_FILES: 'uploadedFiles',
    USER_PREFERENCES: 'userPreferences',
    POKEMON_CACHE: 'pokemonCache'
};

// Configuración de archivos
export const FILE_CONFIG = {
    MAX_FILE_SIZE_MB: 50, // Tamaño máximo por archivo
    MAX_TOTAL_FILES: 100, // Número máximo de archivos
    ALLOWED_TYPES: [
        'image/*',
        'video/*',
        'audio/*',
        'application/pdf',
        'text/*',
        'application/json',
        'application/zip',
        'application/x-rar-compressed'
    ]
};

// URLs de la API
export const API_URLS = {
    POKEMON_BASE: 'https://pokeapi.co/api/v2/',
    POKEMON_LIST: 'pokemon?limit=1000',
    POKEMON_DETAIL: 'pokemon/'
};

// Tipos de Pokémon y sus colores
export const POKEMON_TYPE_COLORS = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

// Rutas de la aplicación
export const ROUTES = {
    HOME: '/',
    FILES: '/files',
    POKEMON: '/pokemon'
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
    FILE_TOO_LARGE: 'El archivo es demasiado grande',
    FILE_TYPE_NOT_ALLOWED: 'Tipo de archivo no permitido',
    POKEMON_NOT_FOUND: 'Pokémon no encontrado',
    NETWORK_ERROR: 'Error de conexión',
    STORAGE_FULL: 'Almacenamiento lleno'
};

// Configuración de la aplicación
export const APP_CONFIG = {
    NAME: 'File & Pokémon Manager',
    VERSION: '1.0.0',
    DESCRIPTION: 'Aplicación para gestión de archivos y búsqueda de Pokémon',
    AUTHOR: 'QA Challenge',
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutos en millisegundos
    DEBOUNCE_DELAY: 300 // Delay para búsquedas en millisegundos
};

// Breakpoints para responsive design
export const BREAKPOINTS = {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px'
};

// Estados de carga
export const LOADING_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};