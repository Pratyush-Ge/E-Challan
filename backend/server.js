const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '69@Pratyush',
  database: 'tpms'
});

db.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
  connection.release();
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send('Missing required fields');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO personnel_details (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      res.status(400).send('Error signing up');
      return;
    }
    res.status(200).send('Signed up successfully');
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Missing email or password');
  }
  const sql = 'SELECT * FROM personnel_details WHERE email = ?';
  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error(err);
      res.status(400).send('Error logging in');
      return;
    }
    if (result.length === 0) {
      res.status(401).send('Invalid credentials');
      return;
    }
    const match = await bcrypt.compare(password, result[0].password);
    if (match) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});



app.post('/addViolator', (req, res) => {
  const { aadharNumber, name, address, phone } = req.body;
  
  const selectQuery = 'SELECT personnel_id AS pid FROM personnel_details ORDER BY personnel_id DESC LIMIT 1';

  db.query(selectQuery, (err, rows) => {
    if (err) {
      console.error('Error fetching personnel details:', err);
      res.status(400).send('Error fetching personnel details: ' + err.message);
      return;
    }

    if (rows.length === 0) {
      res.status(400).send('No personnel found');
      return;
    }

    const pid = rows[0].pid;

    const insertQuery = 'INSERT INTO violator_details (pid, aadhar_number, name, address, phone) VALUES (?, ?, ?, ?, ?)';

    db.query(insertQuery, [pid, aadharNumber, name, address, phone], (err, result) => {
      if (err) {
        console.error('Error adding violator details:', err);
        res.status(400).send('Error adding violator details: ' + err.message);
        return;
      }

      if (result.affectedRows === 0) {
        res.status(400).send('Violator with Aadhar Number already exists');
        return;
      }

      res.status(200).send('Violator details added successfully');
    });
  });
});





app.post('/addVehicle', (req, res) => {
  const { vehicleNumber, vehicleType } = req.body;
  const insertQuery = 'INSERT INTO vehicle_details (aadhar_number, vehicle_number, vehicle_type) VALUES (?, ?, ?)';

  const selectQuery = 'SELECT aadhar_number FROM violator_details ORDER BY vid DESC LIMIT 1';

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error retrieving Aadhaar number:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (result.length === 0) {
      console.error('No Aadhaar number found');
      res.status(404).send('No Aadhaar number found');
      return;
    }

    const aadharNumber = result[0].aadhar_number;

    db.query(insertQuery, [aadharNumber, vehicleNumber, vehicleType], (err, result) => {
      if (err) {
        console.error('Error adding vehicle details:', err);
        res.status(400).send('Error adding vehicle details: ' + err.message);
        return;
      }
      res.status(200).send('Vehicle details added successfully');
    });
  });
});

app.post('/generateChallanReceipt', (req, res) => {
  const { violationType, penaltyAmount } = req.body;

  if (!violationType || !penaltyAmount) {
    return res.status(400).send('Missing required fields');
  }

  db.query('SELECT aadhar_number FROM violator_details ORDER BY vid DESC LIMIT 1', (err, result) => {
    if (err) {
      console.error('Error retrieving Aadhar number:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.length === 0) {
      console.error('No Aadhar number found');
      return res.status(404).send('No Aadhar number found');
    }

    const aadharNumber = result[0].aadhar_number;

    db.query('SELECT * FROM challan_cost WHERE aadhar_number = ? ORDER BY challan_id DESC LIMIT 1', [aadharNumber], (err, result) => {
      if (err) {
        console.error('Error retrieving existing entry:', err);
        return res.status(500).send('Internal Server Error');
      }

      let newPenalty = penaltyAmount;
      let existingViolationTypes = '';
      if (result.length > 0) {
        newPenalty += result[0].penalty_amount;
        existingViolationTypes = result[0].violation_type; 
      }

      const updatedViolationTypes = existingViolationTypes ? existingViolationTypes + ', ' + violationType : violationType;

      if (result.length > 0) {
        db.query('UPDATE challan_cost SET violation_type = ?, penalty_amount = ? WHERE challan_id = ?', [updatedViolationTypes, newPenalty, result[0].challan_id], (err, result) => {
          if (err) {
            console.error('Error updating existing entry:', err);
            return res.status(500).send('Internal Server Error');
          }
          res.status(200).send('Existing entry updated successfully');
        });
      } else {
        const insertQuery = 'INSERT INTO challan_cost (aadhar_number, violation_date, violation_type, penalty_amount) VALUES (?, CURDATE(), ?, ?)';
        db.query(insertQuery, [aadharNumber, violationType, newPenalty], (err, result) => {
          if (err) {
            console.error('Error generating challan receipt:', err);
            return res.status(400).send('Error generating challan receipt');
          }
          res.status(200).send('Challan receipt generated successfully');
        });
      }
    });
  });
});






app.get('/getViolatorDetails', (req, res) => {
  const selectQuery = 'SELECT * FROM violator_details ORDER BY vid DESC LIMIT 1';

  db.query(selectQuery, (err, violatorResult) => {
    if (err) {
      console.error('Error retrieving violator details:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (violatorResult.length === 0) {
      console.error('No violator found');
      return res.status(404).send('No violator found');
    }

    const { aadhar_number } = violatorResult[0];

    const vehicleQuery = 'SELECT * FROM vehicle_details WHERE aadhar_number = ?';
    db.query(vehicleQuery, [aadhar_number], (err, vehicleResult) => {
      if (err) {
        console.error('Error retrieving vehicle details:', err);
        return res.status(500).send('Internal Server Error');
      }

      const challanQuery = 'SELECT * FROM challan_cost WHERE aadhar_number = ?';
      db.query(challanQuery, [aadhar_number], (err, challanResult) => {
        if (err) {
          console.error('Error retrieving challan details:', err);
          return res.status(500).send('Internal Server Error');
        }

        const violatorDetails = {
          personalDetails: violatorResult[0],
          vehicleDetails: vehicleResult,
          challanDetails: challanResult
        };

        res.status(200).json(violatorDetails);
      });
    });
  });
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
