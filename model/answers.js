const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answers', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    assigned_test_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'assigned_test',
        key: 'id'
      }
    },
    question_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      }
    },
    choice_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'choices',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    batch_number: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'answers',
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
        name: "answers_assigned_test_id_foreign",
        using: "BTREE",
        fields: [
          { name: "assigned_test_id" },
        ]
      },
      {
        name: "answers_question_id_foreign",
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
      {
        name: "answers_choice_id_foreign",
        using: "BTREE",
        fields: [
          { name: "choice_id" },
        ]
      },
      {
        name: "answers_user_id_foreign",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
