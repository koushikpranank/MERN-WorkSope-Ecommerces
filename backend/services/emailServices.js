const transport = require("../config/emailConfig");

// Registration Otp Email
const sendOtpEmail = async (email, otp) => {
  const response = await transport.send({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP for Registration",
    // text: `Your OTP for registration is: ${otp}`,
    html: `<p>Your OTP for registration is: <strong>${otp}</strong></p>`,
  });
  return response;
};

// Registration Completion Email
const sendRegistrationCompletionEmail = async (email) => {
  const response = await transport.send({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Registration Successful",
    text: "Thank you for registering with us!",
  });
  return response;
};

// Promotion cart Product mail

// order Placed mail
