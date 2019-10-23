module.exports = (sequelize, DataTypes) => {
  const Entrys = sequelize.define('Entrys', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    type: DataTypes.ENUM('public', 'private'),
  }, {});
  Entrys.associate = (models) => {
    Entrys.belongsTo(models.Users, { foreignKey: 'userId' });
  };
  return Entrys;
};
