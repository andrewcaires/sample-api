import * as dotenv from 'dotenv';

dotenv.config();

const toBool = (value: string): boolean => {

    return value === 'true' ? true : false;
}

export const API_DB_DATABASE = process.env.API_DB_DATABASE!;
export const API_DB_HOST = process.env.API_DB_HOST || '127.0.0.1';
export const API_DB_PASSWORD = process.env.API_DB_PASSWORD || '';
export const API_DB_PORT = parseInt(process.env.API_DB_PORT || '3306');
export const API_DB_TYPE = process.env.API_DB_TYPE || '';
export const API_DB_USERNAME = process.env.API_DB_USERNAME || 'root';
export const API_DB_LOG = toBool(process.env.API_DB_LOG || 'false');

export const API_HTTP_PORT = parseInt(process.env.API_HTTP_PORT || '3000');
export const API_HTTP_PUBLIC = process.env.API_HTTP_PUBLIC!;
export const API_HTTP_CROSS = toBool(process.env.API_HTTP_CROSS || 'false');

export const API_SSL_CRT = process.env.API_SSL_CRT!;
export const API_SSL_KEY = process.env.API_SSL_KEY!;

export const API_TOKEN_SECRET = process.env.API_TOKEN_SECRET!;
export const API_TOKEN_TIME = parseInt(process.env.API_TOKEN_TIME || '15');

export const API_WEBSOCKET_START = toBool(process.env.API_WEBSOCKET_START || 'false');
