const sgMail = require("@sendgrid/mail");

const { SEND_GRID } = process.env;

sgMail.setApiKey(SEND_GRID);

const sendEmail = async (data) => {

  const mail = { ...data, from: "andrewvovk89@gmail.com" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
