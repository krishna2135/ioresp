const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "roles_slug_unique"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "roles_slug_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slug" },
        ]
      },
    ]
  });
};
