const express = require("express");
require('dotenv').config();
const routes = require("./routes/routes.js")
const bodyParser = require('body-parser');
const {connectDB} = require("./database/dbConnection.js")
const {swaggerUi, swaggerDocs} = require("./middlewares/swagger.js")


const app = express();
app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/notification', routes);
app.listen(port, () => {
    console.log("Server running on:", port);
});

connectDB();