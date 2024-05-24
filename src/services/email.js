const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendMail(reciever, emailType, token) {
  try {
    if (emailType === "thank-you") {
      await transporter.sendMail({
        from: process.env.GMAIL,
        to: reciever,
        subject: "Thank you ♥",
        html: "<strong>Thank you for Creating an Account on Dribble-Clone. May you find the designs you like.</strong>",
      });
    }
    if (emailType === "email-confirmation") {
      await transporter.sendMail({
        from: process.env.GMAIL,
        to: reciever,
        subject: "Email confirmation",
        html: `<strong>To Confirm your email click <a href='https://dribble-clone-gamma.vercel.app/auth/verify-email?token=${token}' >here</a> </strong>`,
      });
    }
  } catch (err) {
    throw new Error(err.message || "failed to send email");
  }
}

module.exports = {
  sendMail,
};
