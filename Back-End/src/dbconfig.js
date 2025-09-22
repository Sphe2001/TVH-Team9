
import Sequelize from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();        
const DB_HOST="localhost";
const DB_USER="root";
const DB_PASSWORD="";
const DB_NAME="datadivers";
const DB_PORT=3306;

const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{ 
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database:');
    });


export default sequelize;