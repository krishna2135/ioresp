const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notifications', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    notifiable_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    notifiable_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    read_at: {
      type: DataTypes.DATE,
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
    tableName: 'notifications',
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
        name: "notifications_notifiable_type_notifiable_id_index",
        using: "BTREE",
        fields: [
          { name: "notifiable_type" },
          { name: "notifiable_id" },
        ]
      },
    ]
  });
};
