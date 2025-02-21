import { DataTypes, ENUM, Model } from "sequelize";
import { sequelize } from "../config/sql.js";

class whatsapp extends Model {}

whatsapp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      validate:{
      len:[1,3]
      },
      primaryKey: true,
      autoIncrement: true,
    },
    nodeid:{
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    to: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file:{
         type: DataTypes.STRING(150),
         allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "whatsapp",
    tableName: "whatsapp",
    timestamps: true,
  }
);

export default whatsapp;
