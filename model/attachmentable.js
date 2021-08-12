const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attachmentable', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    attachmentable_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    attachmentable_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    attachment_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'attachments',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'attachmentable',
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
        name: "attachmentable_attachmentable_type_attachmentable_id_index",
        using: "BTREE",
        fields: [
          { name: "attachmentable_type" },
          { name: "attachmentable_id" },
        ]
      },
      {
        name: "attachmentable_attachment_id_foreign",
        using: "BTREE",
        fields: [
          { name: "attachment_id" },
        ]
      },
    ]
  });
};
