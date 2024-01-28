const {userModel} = require('../model/userModel')

const verifyOTP = async (req, res) => {
    const { Email, EnteredOTP } = req.body;
  
    try {
      if (!Email || !EnteredOTP) {
        return res.status(400).json({ msg: "Incomplete data provided" });
      }
  
      const user = await userModel.findOne({ Email });
  
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "User not found",
        });
      }
  
      if (user.OTP !== EnteredOTP) {
        return res.status(401).json({
          status: false,
          message: "Incorrect OTP",
        });
      }
  
      // OTP is correct, you can perform further actions here if needed
  
      res.status(200).json({
        status: true,
        message: "OTP verified successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  module.exports = {verifyOTP}