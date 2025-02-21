import { DataTypes, ENUM, Model } from "sequelize";
import { sequelize } from "../config/sql.js";

class SMS extends Model {}

SMS.init(
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
    from: {
      type: DataTypes.STRING(50),
      defaultValue:"1234567890",
      allowNull: false,
    },
    phoneno: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(320),
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "sms",
    tableName: "sms",
    timestamps: true,
  }
);

export default SMS;
