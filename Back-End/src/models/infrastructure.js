import { DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

const infrastructure = sequelize.define('Infrastructure', {
    infra_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    sensor_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    infrastructure_location: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}
    ,{});

export default infrastructure;