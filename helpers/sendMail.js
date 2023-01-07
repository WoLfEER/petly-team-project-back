const sgMail = require("@sendgrid/mail");
// установить сендгрид или нод мейлер
const { SEND_GRID } = process.env;
// Закинуть в .енв и клаудинери.конфиг инфу
sgMail.setApiKey(SEND_GRID);

const sendEmail = async (data) => {
  //   console.log(data);
  const mail = { ...data, from: "andrewvovk89@gmail.com" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
