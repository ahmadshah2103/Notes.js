const {DataTypes} = require('sequelize');
const User = require('./user');

module.exports = (sequelize) => {
    const Note = sequelize.define('Note', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'notes',
        underscored: true,
        timestamps: true,
        hooks: {
            beforeCreate: async (note) => {
                if (note.title) {
                    note.title = note.title.trim()
                }
                if (note.content) {
                    note.content = note.content.trim()
                }
            },
            beforeUpdate: async (note) => {
                if (note.title) {
                    note.title = note.title.trim()
                }
                if (note.content) {
                    note.content = note.content.trim()
                }
            },
        }
    })

    Note.associate = (models) => {
        Note.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Note;
}
