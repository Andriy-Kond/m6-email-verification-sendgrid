// const sgMail = require("@sendgrid/mail");
import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY_TEST_PROJECT);

// usually used special function for send email and pass data from outside
export const sendEmail = async data => {
  const msg = {
    ...data,
    from: "andreyall2@meta.ua", // Change to your verified sender
    // to: "sivim78851@citdaca.com", // Change to your recipient
    // subject: "Sending with SendGrid is Fun",
    // text: "and easy to do anywhere, even with Node.js",
    // html: "<p> some email <strong>and easy to do anywhere, even with Node.js</strong></p>",
  };

  await sgMail.send(msg);
  console.log("Email sent");

  return true;
};

// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch(error => {
//     console.error(error);
//   });
