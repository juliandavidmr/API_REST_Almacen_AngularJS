/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Empleado', {
    idEmpleado: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    FechaRegistro: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    fk_idPersona: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Persona',
        key: 'idPersona'
      }
    },
    fk_idRol: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Rol',
        key: 'idRol'
      }
    },
    fk_idSucursa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Sucursal',
        key: 'idSucursa'
      }
    }
  });
};
