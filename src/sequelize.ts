import { Sequelize, UUID, UUIDV4 } from "sequelize";

import { API_DB_DATABASE, API_DB_HOST, API_DB_LOG, API_DB_PASSWORD, API_DB_PORT, API_DB_TYPE, API_DB_USERNAME } from "./config";

const mariadb = (): Sequelize => {

  return new Sequelize(
    API_DB_DATABASE,
    API_DB_USERNAME,
    API_DB_PASSWORD,
    {
      host: API_DB_HOST,
      port: API_DB_PORT,
      dialect: "mariadb",
      logging: API_DB_LOG,
      define: {
        timestamps: false,
      },
    },
  );
};

const mysql = (): Sequelize => {

  return new Sequelize(
    API_DB_DATABASE,
    API_DB_USERNAME,
    API_DB_PASSWORD,
    {
      host: API_DB_HOST,
      port: API_DB_PORT,
      dialect: "mysql",
      logging: API_DB_LOG,
      define: {
        timestamps: false,
      },
    },
  );
};

const postgres = (): Sequelize => {

  return new Sequelize(
    API_DB_DATABASE,
    API_DB_USERNAME,
    API_DB_PASSWORD,
    {
      host: API_DB_HOST,
      port: API_DB_PORT,
      dialect: "postgres",
      logging: API_DB_LOG,
      define: {
        timestamps: false,
      },
    },
  );
};

const create = (): Sequelize => {

  switch (API_DB_TYPE) {
  case "mariadb":
    return mariadb();
  case "mysql":
    return mysql();
  case "postgres":
    return postgres();
  }

  throw new Error("No database selected");
};

export const uuid = {

  type: UUID,
  defaultValue: UUIDV4,
  allowNull: false,
  primaryKey: true,
};

export const sequelize = create();
