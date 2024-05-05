const bcrypt = require('bcrypt');
const Personnel = require('../models/personnelModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Missing email or password');
    }
  
    try {
      const personnel = await Personnel.findOne({ email });
      if (!personnel) {
        return res.status(401).send('Invalid email or password');
      }
  
      const match = await bcrypt.compare(password, personnel.password);
      if (match) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (err) {
      console.error(err);
      res.status(400).send('Error logging in');
    }
  };

exports.signup = async (req, res) => {
    const { name, email, password, areaOfOperation } = req.body;
    if (!name || !email || !password || !areaOfOperation) {
      return res.status(400).send('Missing required fields');
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Personnel.create({ name, email, password: hashedPassword, areaOfOperation });
      res.status(200).send('Signed up successfully');
    } catch (err) {
      console.error(err);
      res.status(400).send('Error signing up');
    }
  };

  exports.fetchPersonnelDetails = async (req, res) => {
    const { email } = req.params;
  
    try {
      const personnel = await Personnel.findOne({ email });
      if (!personnel) {
        return res.status(404).send('Personnel not found');
      }
  
      res.status(200).json(personnel);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  };
