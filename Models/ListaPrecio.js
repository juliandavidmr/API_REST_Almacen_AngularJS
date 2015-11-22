/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ListaPrecio', {
    idListaPrecio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
};
