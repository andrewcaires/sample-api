import { existsSync, readFileSync } from 'fs';

import { API_SSL_CRT, API_SSL_KEY } from './config';

const getCrt = (): Buffer | undefined => {

    if (existsSync(API_SSL_CRT)) {

        return readFileSync(API_SSL_CRT);
    }
}

const getKey = (): Buffer | undefined => {

    if (existsSync(API_SSL_KEY)) {

        return readFileSync(API_SSL_KEY);
    }
}

export const crt = getCrt();
export const key = getKey();
