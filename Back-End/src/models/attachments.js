import { DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";
import infrastructure from "./infrastructure.js";

const attachments = sequelize.define('Attachments', {
    att_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    incident_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
},{});

export default attachments;