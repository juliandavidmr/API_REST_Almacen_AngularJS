/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DetalleListaPrecio', {
    idDetalleListaPrecio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Precio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fk_idListaPrecio: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ListaPrecio',
        key: 'idListaPrecio'
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
