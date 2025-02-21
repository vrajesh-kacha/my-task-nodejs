import  { Model, DataTypes } from'sequelize';
import { sequelize } from '../config/sql.js'; 

class Product extends Model {}

Product.init(
  {
    Product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HSNCode: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    MFG: {
      type: DataTypes.DATEONLY, 
      allowNull: false,
    },
    EXP: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    BatchNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MRP: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Tax: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Product', 
    tableName: 'Products', 
    timestamps: true, 
  }
);

export default Product;


