/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sucursal', {
    idSucursa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fk_idEmpresa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Empresa',
        key: 'idEmpresa'
      }
    }
  });
};
