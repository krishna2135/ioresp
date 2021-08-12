const sequelize = require('../database/connection');
const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');

//const sequelize = new Sequelize(DbConnection);

class UsersModel extends Model {}

UsersModel.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    password: DataTypes.STRING,
    remember_token: DataTypes.STRING,
    permissions: DataTypes.BOOLEAN
}, {
    sequelize,
    modelName: 'users'
});
module.exports = UsersModel;