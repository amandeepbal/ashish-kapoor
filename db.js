var Sequelize = require('sequelize');
var fs        = require('fs');
var path      = require('path');

var sequelize = new Sequelize('dcf1185buk5dbe', 'pmemqhietpvqty', '43932c604eb9646db5307cd0987e34f0536ca6723f68dd3fe85381d32d857a70', {
    host:'ec2-50-19-105-188.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

var basename  = path.basename(module.filename);

//Load all the models
fs
    .readdirSync(__dirname+ '/models/')
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname + '/models/', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;