/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Proveedor', {
    idProveedor: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Ciudad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Correo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Telefono1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Telefono2: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
