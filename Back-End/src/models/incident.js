import { DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";
import infrastructure from "./infrastructure.js";

const incident = sequelize.define('Incident', {
    incident_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    incident_description: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
   incident_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    incident_priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium',
    },
     incident_type: {
        type: DataTypes.ENUM('reported', 'in_progress', 'resolved'),
        defaultValue: 'reported',
    },
     incident_location: {
       type: DataTypes.STRING,
        allowNull: false,
    },
    infrastructure_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}
    ,{});

export default incident;