module.exports = function (sequelize, DataTypes) {
    return sequelize.define('contest', {
        contestId: {
            // type: DataTypes.UUID,
            // defaultValue: DataTypes.UUIDV1,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        contestHeading: {
            type: DataTypes.STRING,
            allowNull: false
        },
        propertyURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.STRING(50)
        },
    },{
        freezeTableName: true
    },{
            scopes: {
                active: {
                    where: {
                        active: true
                    }
                }
            },
            underscored: true,
            freezeTableName: true,
            tableName: 'contest',
            classMethods: {
                associate: function(models) {
                    //a BP can have many roles
                    models.contest.hasMany(models.participant, {
                        onDelete: 'cascade',
                        foreignKey: 'contestId',
                        constraints: false
                    });
                }
            }
        }
    );
};
