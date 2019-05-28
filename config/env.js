let environment = process.env.NODE_ENV;
if (environment === undefined)
  environment= 'development';

let env = {};
switch (environment) {
  case 'development': env= require(',/env-dev'); break;
  case 'test': env= require('./env-test'); break;
  case 'production': env = require('./env-prod');
}