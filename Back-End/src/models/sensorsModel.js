import { DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

const sensors = sequelize.define('Sensors', {
    sensor_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    sensor_location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    protected_infrastructure: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detection_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    sensor_status: {
        type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
        defaultValue: 'active',
    }
}
    ,{});

export default sensors;