import { DataTypes } from "sequelize";
import sequelize from "../dbconfig.js";

const Municipality = sequelize.define('Municipality', {
    municipality_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    infrastructure_location: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}
    ,{});

export default Municipality;