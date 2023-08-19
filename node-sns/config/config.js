require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "NodeSNS",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_PRODUCTION,
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
