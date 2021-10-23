require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database.js');
const cors = require('cors');
const app = express()


app.use(cors());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse aplication/json
// Lectura y parseo del body
app.use(bodyParser.json());

// app.use(express.static(path.resolve(__dirname, '../public')))

// app.use(require('./controllers/index'));
app.use('',require('./routes/indexRoute'));

//connect to dataDb
//Force true: DROP TABLES
sequelize.sync({ force: false }).then(() => {
    console.log('Db online');
}).catch(err => {
    console.log(`error in the connection to de db: ${err}`)
});

app.listen(process.env.PORT, () => {
    console.log(`The is runing on the port ${process.env.PORT}`);
});