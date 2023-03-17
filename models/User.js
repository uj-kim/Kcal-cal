const User = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "user",
    {
      // userid VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY
      userid: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      // userpw VARCHAR(20)
      userpw: {
        type: DataTypes.STRING(20),
      },
      // useremail VARCHAR(100) NOT NULL UNIQUE
      useremail: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      // nickname VARCHAR(10) NOT NULL
      nickname: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      // gender ENUM('F', 'M', '') DEFAULT ''
      gender: {
        type: DataTypes.ENUM("F", "M", ""),
        defaultValue: "",
      },
      // age INT
      age: {
        type: DataTypes.INTEGER,
      },
      // height INT
      height: {
        type: DataTypes.INTEGER,
      },
      userprofile: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      tableName: "user",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return model;
};

module.exports = User;
