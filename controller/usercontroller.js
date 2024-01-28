const { userModel } = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/nodemailer"); // Replace with the actual path

const signupUser = async (req, res) => {
  const { Firstname, Lastname, Email, Password } = req.body;

  try {
    if (!Firstname || !Lastname || !Email || !Password) {
      return res.status(400).json({ msg: "Incomplete data provided" });
    }

    // Check for an existing user
    const existingUser = await userModel.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    // Salt and hash the password
    const salt = bcrypt.genSaltSync(12);
    const hashPassword = await bcrypt.hashSync(Password, salt);

    // Generate and send OTP via email
    const generateOTP = () => {
      const min = 1000;
      const max = 9999;
      return Math.floor(min + Math.random() * (max - min + 1)).toString();
    };

    const otp = generateOTP(); // Assuming you have the generateOTP function

    await sendEmail({
      email: Email,
      subject: "OTP for Signup",
      html: `<p>Your One-Time Password (OTP) for signup is: <b><h1>${otp} </h1></b> </p>`,
    });

    // Create a new Model
    const newUser = new userModel({
      Firstname,
      Lastname,
      Email,
      Password: hashPassword,
      OTP:otp,
    });

    await newUser.save();

    res.status(200).json({
      status: true,
      message: "Please enter the OTP sent to your email!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { signupUser };
