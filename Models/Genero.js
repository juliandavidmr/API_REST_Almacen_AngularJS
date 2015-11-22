/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Genero', {
    idGenero: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
