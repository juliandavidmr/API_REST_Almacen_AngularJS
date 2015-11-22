/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Producto', {
    idProducto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Medida: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IVA: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  });
};
