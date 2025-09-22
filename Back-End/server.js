
import express from 'express';

import sequelize from "./src/dbconfig.js";
import './src/models/relationships.js';
import './src/models/index.js';

const app = express();
const port = 3000;

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.')}).catch((err) => {
      console.error('An error occurred while synchronizing the database:', err);
    });


app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});


