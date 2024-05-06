  // const dotnev = require('dotenv');
  // const twilio = require('twilio');

  // dotnev.config();

  // const accountSid = process.env.SID_TWILIO;
  // const authToken = process.env.AUTH_TOKEN_TWILIO;
  // const numberTwilio = process.env.TWILIO_NUMBER;
  // const client = new twilio(accountSid, authToken);

  // exports.sendSMS = async (req, res) => {
  //   try {
  //     const { to, body } = req.body;
  //     const message = await client.messages.create({ to, body, from: {numberTwilio} });
  //     console.log('Message sent:', message.sid);
  //     res.status(200).send('SMS sent successfully');
  //   } catch (error) {
  //     console.error('Error sending SMS:', error);
  //     res.status(500).send('Failed to send SMS');
  //   }
  // };

