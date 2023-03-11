import { Options } from 'sequelize';

const config: Options = {
  dialect: 'sqlite',
  storage: './src/database/db.sqlite'
}

module.exports = config;
