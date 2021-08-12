var DataTypes = require("sequelize").DataTypes;
var _answers = require("./answers");
var _assigned_test = require("./assigned_test");
var _attachmentable = require("./attachmentable");
var _attachments = require("./attachments");
var _choices = require("./choices");
var _doctor_profiles = require("./doctor_profiles");
var _failed_jobs = require("./failed_jobs");
var _frequencies = require("./frequencies");
var _migrations = require("./migrations");
var _notifications = require("./notifications");
var _password_resets = require("./password_resets");
var _patient_profiles = require("./patient_profiles");
var _personal_access_tokens = require("./personal_access_tokens");
var _questions = require("./questions");
var _role_users = require("./role_users");
var _roles = require("./roles");
var _settings = require("./settings");
var _user_doctor = require("./user_doctor");
var _user_settings = require("./user_settings");
var _users = require("./users");
var _videos = require("./videos");

function initModels(sequelize) {
  var answers = _answers(sequelize, DataTypes);
  var assigned_test = _assigned_test(sequelize, DataTypes);
  var attachmentable = _attachmentable(sequelize, DataTypes);
  var attachments = _attachments(sequelize, DataTypes);
  var choices = _choices(sequelize, DataTypes);
  var doctor_profiles = _doctor_profiles(sequelize, DataTypes);
  var failed_jobs = _failed_jobs(sequelize, DataTypes);
  var frequencies = _frequencies(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var password_resets = _password_resets(sequelize, DataTypes);
  var patient_profiles = _patient_profiles(sequelize, DataTypes);
  var personal_access_tokens = _personal_access_tokens(sequelize, DataTypes);
  var questions = _questions(sequelize, DataTypes);
  var role_users = _role_users(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var settings = _settings(sequelize, DataTypes);
  var user_doctor = _user_doctor(sequelize, DataTypes);
  var user_settings = _user_settings(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var videos = _videos(sequelize, DataTypes);

  users.belongsToMany(roles, { through: role_users, foreignKey: "user_id", otherKey: "role_id" });
  roles.belongsToMany(users, { through: role_users, foreignKey: "role_id", otherKey: "user_id" });
  answers.belongsTo(assigned_test, { as: "assigned_test", foreignKey: "assigned_test_id"});
  assigned_test.hasMany(answers, { as: "answers", foreignKey: "assigned_test_id"});
  answers.belongsTo(choices, { as: "choice", foreignKey: "choice_id"});
  choices.hasMany(answers, { as: "answers", foreignKey: "choice_id"});
  answers.belongsTo(questions, { as: "question", foreignKey: "question_id"});
  questions.hasMany(answers, { as: "answers", foreignKey: "question_id"});
  answers.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(answers, { as: "answers", foreignKey: "user_id"});
  assigned_test.belongsTo(users, { as: "doctor", foreignKey: "doctor_id"});
  users.hasMany(assigned_test, { as: "assigned_tests", foreignKey: "doctor_id"});
  assigned_test.belongsTo(users, { as: "patient", foreignKey: "patient_id"});
  users.hasMany(assigned_test, { as: "patient_assigned_tests", foreignKey: "patient_id"});
  attachmentable.belongsTo(attachments, { as: "attachment", foreignKey: "attachment_id"});
  attachments.hasMany(attachmentable, { as: "attachmentables", foreignKey: "attachment_id"});
  doctor_profiles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(doctor_profiles, { as: "doctor_profiles", foreignKey: "user_id"});
  patient_profiles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(patient_profiles, { as: "patient_profiles", foreignKey: "user_id"});
  role_users.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(role_users, { as: "role_users", foreignKey: "user_id"});
  role_users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(role_users, { as: "role_users", foreignKey: "role_id"});
  user_doctor.belongsTo(users, { as: "doctor", foreignKey: "doctor_id"});
  users.hasMany(user_doctor, { as: "user_doctors", foreignKey: "doctor_id"});
  user_doctor.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_doctor, { as: "user_user_doctors", foreignKey: "user_id"});
  user_settings.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_settings, { as: "user_settings", foreignKey: "user_id"});

  return {
    answers,
    assigned_test,
    attachmentable,
    attachments,
    choices,
    doctor_profiles,
    failed_jobs,
    frequencies,
    migrations,
    notifications,
    password_resets,
    patient_profiles,
    personal_access_tokens,
    questions,
    role_users,
    roles,
    settings,
    user_doctor,
    user_settings,
    users,
    videos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
