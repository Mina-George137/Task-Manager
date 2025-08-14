import { DataTypes } from "sequelize";
import sequelize from "../configDB.js";
import User from "./User.js";

const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: {  // Foreign Key
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  }
}, {
  timestamps: true
});

// Relationships
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

export default Task;
