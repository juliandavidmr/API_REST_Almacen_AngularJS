/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FacturaVenta', {
    idFacturaVenta: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Subtotal: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    fk_idCliente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Cliente',
        key: 'idCliente'
      }
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
    fk_idListaPrecio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ListaPrecio',
        key: 'idListaPrecio'
      }
    }
  });
};
