/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FacturaCompra', {
    idFacturaCompra: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Subtotal: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fk_idEmpleado: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Empleado',
        key: 'idEmpleado'
      }
    },
    fk_idProveedor: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Proveedor',
        key: 'idProveedor'
      }
    }
  });
};
