/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DetalleFacturaVenta', {
    idDetalleFacturaVenta: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Cantidad: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    IVA: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Subtotal: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    PrecioTotal: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    PrecioUnitario: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    fk_idFacturaVenta: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'FacturaVenta',
        key: 'idFacturaVenta'
      }
    },
    fk_idProducto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Producto',
        key: 'idProducto'
      }
    }
  });
};
