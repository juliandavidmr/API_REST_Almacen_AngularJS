/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Persona', {
    idPersona: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Nombre1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Nombre2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Apellido1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Apellido2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Celular: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Ciudad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Correo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fk_idGenero: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Genero',
        key: 'idGenero'
      }
    }
  });
};
