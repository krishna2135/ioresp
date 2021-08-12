const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personal_access_tokens', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    tokenable_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tokenable_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "personal_access_tokens_token_unique"
    },
    abilities: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    last_used_at: {
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
    tableName: 'personal_access_tokens',
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
        name: "personal_access_tokens_token_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "token" },
        ]
      },
      {
        name: "personal_access_tokens_tokenable_type_tokenable_id_index",
        using: "BTREE",
        fields: [
          { name: "tokenable_type" },
          { name: "tokenable_id" },
        ]
      },
    ]
  });
};
