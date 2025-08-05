// CommonJS версия для миграций
require("reflect-metadata");
const typeorm = require("typeorm");
const path = require('path');

// Создаем экземпляр DataSource
const dataSource = new typeorm.DataSource({
    type: 'sqlite',
    database: path.join(__dirname, '../../game.db'),
    entities: [path.join(__dirname, '../../dist/data/entities/**/*.js')],
    migrations: [path.join(__dirname, '../../dist/data/migrations/**/*.js')],
    synchronize: false,
    logging: true,
});

// Экспортируем DataSource для TypeORM CLI
module.exports = dataSource;