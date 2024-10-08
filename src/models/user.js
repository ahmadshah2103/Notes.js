const { DataTypes, ENUM} = require('sequelize');
const { Gender } = require('../enums/userEnums');
const {hashPassword} = require('../utils/passwordHashing')
const Note = require('./note')

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            maxLength: 255
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        googleSub: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            maxLength: 255
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            maxLength: 255
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false
        },
        gender: {
            type: ENUM(Gender.MALE, Gender.FEMALE, Gender.NOT_SPECIFIED),
            defaultValue: Gender.NOT_SPECIFIED,
            allowNull: false
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'users',
        underscored: true,
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await hashPassword(user.password)
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    user.password = await hashPassword(user.password)
                }
            }
        }
    })

    User.associate = (models) => {
        User.hasMany(models.Note, {
            foreignKey: 'userId',
            as: 'notes'
        });
    };

    return User;
}