require('dotenv').config({ path: './.env' });

module.exports = {
  input: '../server/api',
  baseURL: `${process.env.API_ORIGIN ?? ''}${process.env.API_BASE_PATH ?? ''}`,
};
