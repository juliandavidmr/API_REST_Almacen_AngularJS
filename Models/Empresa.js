/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Empresa', {
    idEmpresa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    RegistroDIAN: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Correo: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
