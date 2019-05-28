## Sequelize Transacrtion POC
 
 # How to start application

 ```
  npm install
  npx sequelize db:migrate
  npx sequelize db:seed:all
  npm start
 ```

 # Run test
```
  NODE_ENV=test npx sequelize db:migrate
  NODE_ENV=test npx sequelize db:seed:all
  npm test
```

# Quick Guide:
Undo migration
```
  npx sequelize db:migrate:undo:all
```

Undo seeds
```
  npx sequelize db:seed:undo:all
```