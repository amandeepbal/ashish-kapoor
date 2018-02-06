module.exports = function (sequelize, DataTypes) {
    return sequelize.define('participant', {
            contestId: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            participant: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                validate: {
                    isEmail: true
                }
            },
            participant: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                validate: {
                        isEmail: true
                    }
                },
        },{
            freezeTableName: true
        },{
            underscored: true,
            freezeTableName: true,
            tableName: 'participant',
            classMethods: {
                associate: function(models) {
                    models.participant.belongsTo(models.contest, {
                        onDelete: 'cascade',
                        foreignKey: 'contestId',
                        constraints: false
                    });
                }
            }
        }
    );
};
