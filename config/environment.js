var config;

switch(process.env.NODE_ENV) {
  case 'test':
    case 'production':
      config = require('dotenv').config({path: '.env.' + process.env.NODE_ENV, silent: true});
      break;
    default:
      config = require('dotenv').config({ path: '.env', silent: true })
}


module.exports = config;