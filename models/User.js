const {Model, DataTypes} = require ('sequelize');
const sequelize = require ('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {}
User.init ({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unqiue: true 
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[8]
        }
    }
}, {
    hooks: {
        beforeCreate: async userdata => {
            userdata.password = await bcrypt.hash(userdata.password, 5)
            return userdata
        }
    },
    sequelize,
})

module.exports = User;