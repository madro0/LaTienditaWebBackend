const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserModel extends Model {}


UserModel.init({
    id:{
        type:DataTypes.UUID,
        allowNull: false,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                arg:[2, 150],
                msg: 'The name only allow values with length between 2 and 150'
            }
        }
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail:{
                arg:true,
                msg:'the email must be as email type'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER_SELLER',
        validate: {
            isIn:  [['USER_SELLER', 'USER_ADMIN', 'USER_EXECUTIVE', 'USER_OPERATOR', 'USER_DIRECTOR', 'USER_C_MANAGER']]
        }
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    defaultScope: {
        where: {
            active: true
        }
        // ,
        // attributes:{
        //     exclude:['password']
        // }
        
    },
    sequelize,
    modelName: "user",
});


module.exports = UserModel;


