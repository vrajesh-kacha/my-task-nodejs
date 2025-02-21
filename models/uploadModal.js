import  { Model, DataTypes } from'sequelize';
import { sequelize } from '../config/sql.js'; 

class Upload extends Model {}

Upload.init(
  {
    image:{
        type:DataTypes.TEXT('long'),
        allowNull: false,
    }
},
  {
    sequelize, 
    modelName: 'Upload', 
    tableName: 'uploads', 
    timestamps: true, 
  }
);

export default Upload;


