require("dotenv").config();
const twilio = require('twilio');


const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendSMS = async (phone, text) => {
    try {
        client.messages.create({
            body: text,
            from: `${process.env.TWILIO_PHONE_NUMBER}`,
            to:  `+57${phone}`
        })
        .then(message => console.log(`Mensaje enviado con SID: ${message.sid}`))
        return true;
    } catch (error) {
        return false;
    }
   
}

module.exports = { sendSMS };

