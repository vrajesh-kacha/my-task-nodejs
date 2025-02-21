import { DataTypes, ENUM, Model } from "sequelize";
import { sequelize } from "../config/sql.js";

class Email extends Model {}

Email.init(
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
      type:DataTypes.STRING(40),
      
      allowNull:true
    },
    from: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING(320),
      allowNull: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    Attachment: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "email",
    tableName: "email",
    timestamps: true,
  }
);

export default Email;
