const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const personnelController = require('./controllers/personnelController');
const violatorController = require('./controllers/violatorController');
const challanController = require('./controllers/challanController');
const vehicleController = require('./controllers/vehicleController');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.post('/signup', personnelController.signup);
app.post('/login', personnelController.login);
app.post('/addViolator', violatorController.addViolator);
app.get('/getViolatorDetails/:aadharNumber', violatorController.getViolatorDetails);
app.post('/generateChallanReceipt', challanController.generateChallanReceipt);
app.get('/fetchChallan/:aadharNumber', challanController.fetchChallan);
app.post('/addVehicle', vehicleController.addVehicle);
app.get('/fetchVehicleDetails/:aadharNumber', vehicleController.fetchVehicleDetails);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
