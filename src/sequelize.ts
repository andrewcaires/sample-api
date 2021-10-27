import { Sequelize } from 'sequelize';

import { API_DB_DATABASE, API_DB_HOST, API_DB_LOG, API_DB_PASSWORD, API_DB_PORT, API_DB_TYPE, API_DB_USERNAME } from "./config";

const mariadb = (): Sequelize => {

    return new Sequelize(
        API_DB_DATABASE,
        API_DB_USERNAME,
        API_DB_PASSWORD,
        {
            host: API_DB_HOST,
            port: API_DB_PORT,
            dialect: 'mariadb',
            logging: API_DB_LOG,
            define: {
                timestamps: false
            }
        }
    );
}

const mysql = (): Sequelize => {

    return new Sequelize(
        API_DB_DATABASE,
        API_DB_USERNAME,
        API_DB_PASSWORD,
        {
            host: API_DB_HOST,
            port: API_DB_PORT,
            dialect: 'mysql',
            logging: API_DB_LOG,
            define: {
                timestamps: false
            }
        }
    );
}

const memory = (): Sequelize => {

    return new Sequelize(
        'sqlite::memory:',
        {
            logging: API_DB_LOG,
            define: {
                timestamps: false
            }
        }
    );
}

const postgres = (): Sequelize => {

    return new Sequelize(
        API_DB_DATABASE,
        API_DB_USERNAME,
        API_DB_PASSWORD,
        {
            host: API_DB_HOST,
            port: API_DB_PORT,
            dialect: 'postgres',
            logging: API_DB_LOG,
            define: {
                timestamps: false
            }
        }
    );
}

const sqlite = (): Sequelize => {

    return new Sequelize({
        storage: API_DB_HOST,
        dialect: 'sqlite',
        logging: API_DB_LOG,
        define: {
            timestamps: false
        }
    });
}

const create = (): Sequelize => {

    switch (API_DB_TYPE) {
        case 'mariadb':
            return mariadb();
        case 'mysql':
            return mysql();
        case 'postgres':
            return postgres();
        case 'sqlite':
            return sqlite();
    }

    return memory();
}

export const sequelize = create();
