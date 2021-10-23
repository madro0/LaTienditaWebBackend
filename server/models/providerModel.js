const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const { v4 } =require('uuid');

class ProviderModel extends Model {}

ProviderModel.init({
    id:{
        type:DataTypes.UUID,
        allowNull: false,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:{
                args: [2, 150],
                msg:'The name only allow values with length between 2 and 150'
            },
            notNull:{
                args: true,
                msg:'The name be not null',
            }
        }
    },
    phone:{
        type: DataTypes.STRING,
        allowNull:true,
        validate:{
            len:{
                args:[7, 15],
                msg:'The phone only allow values with length between 7 and 15 characters'
            }
        }
    },
    address:{
        type: DataTypes.STRING,
        allowNull:true,
        validate:{
            len:{
                args:[5, 255],
                msg:'The address only allow values with length between 5 and 255 characters'
            }
        }
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
},{
    defaultScope:{
        where:{
            active: true
        }
    },
    sequelize,
    modelName:'provider'
});

module.exports = ProviderModel;