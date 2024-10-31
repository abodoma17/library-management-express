require('dotenv').config();
const express = require('express');
const app = express();
const apiRouter = require('./routes/index');
const apiVersion = process.env.API_VERSION || 'v1';
const sequelize = require('./config/database');

app.use(express.json());

app.use(`/api/${apiVersion}`, apiRouter);

sequelize.authenticate()
    .then(() => console.log('Connected to database successfully'))
    .catch(err => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})