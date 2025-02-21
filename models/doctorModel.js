import { DataTypes, ENUM, Model } from "sequelize";
import { sequelize } from "../config/sql.js";

class Doctor extends Model {}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      validate:{
      len:[1,3]
      },
      primaryKey: true,
      autoIncrement: true,
    },
    doctorname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    contactnumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: true,
    },
    clinicname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    addressline1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressline2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalcode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      type: ENUM('active','inactive'),
      defaultValue: 'active'
    },
    updatedby : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedon: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW()
    },
  },
  {
    sequelize,
    modelName: "doctor",
    tableName: "doctors",
    timestamps: false,
  }
);

export default Doctor;
