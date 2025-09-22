
import sequelize from './src/dbconfig';

sequelize
.sync({ force: false }) 
.then (() => {
    console.log('All models were synchronized successfully.');
})
.catch((err) => {
    console.error('An error occurred while synchronizing the models:', err);
})// Use { force: true } to drop and recreate tables