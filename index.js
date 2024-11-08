const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', require('./carsRoutes'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

