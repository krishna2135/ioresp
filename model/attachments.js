const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attachments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    original_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mime: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    extension: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    alt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    disk: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "public"
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    group: {
      type: DataTypes.STRING(255),
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
    tableName: 'attachments',
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
    ]
  });
};
