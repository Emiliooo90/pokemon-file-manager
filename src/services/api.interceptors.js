import axios from 'axios';

// Configuración de la API de Pokémon
const MAX_REQUESTS_PER_SECOND = 10;
const REQUEST_INTERVAL = 1000; // 1 segundo

let requestCount = 0;
let windowStart = Date.now();

// Configuración base para PokeAPI
const pokemonAPI = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 10000,
});

// Middleware de limitación de solicitudes
const rateLimitMiddleware = (config) => {
    const now = Date.now();
    
    // Restablecer ventana si han pasado más de 1 segundo
    if (now - windowStart >= REQUEST_INTERVAL) {
        requestCount = 0;
        windowStart = now;
    }
    
    // Comprobar si estamos excediendo el límite de solicitudes
    if (requestCount >= MAX_REQUESTS_PER_SECOND) {
        const waitTime = REQUEST_INTERVAL - (now - windowStart);
        console.warn(`[WAIT] Rate limit reached. Waiting ${waitTime}ms before next request.`);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                requestCount++;
                resolve(config);
            }, waitTime);
        });
    }
    
    requestCount++;
    return config;
};

// Interceptor de request
pokemonAPI.interceptors.request.use(
    async (config) => {
        const rateLimitedConfig = await rateLimitMiddleware(config);
        console.log('[API] API Request:', rateLimitedConfig.method?.toUpperCase(), rateLimitedConfig.url);
        return rateLimitedConfig;
    },
    (error) => {
        console.error('[ERROR] Request Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor de response
pokemonAPI.interceptors.response.use(
    (response) => {
        console.log('[SUCCESS] API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url;
        
        if (status === 404) {
            console.warn(`[WARNING] Pokemon not found: ${url}`);
        } else {
            console.error('[ERROR] Response Error:', status, error.message);
        }
        
        return Promise.reject(error);
    }
);

export { pokemonAPI };