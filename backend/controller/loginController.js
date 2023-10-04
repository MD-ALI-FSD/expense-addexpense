//Importing "Product" model to save and retrive data from the products table in the database
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.postVerifyUser = async (req, res, next) => {
  try {
    const uemail = req.body.email;
    const upassword = req.body.password;

    // if (isstringinvalid(uemail) || isstringinvalid(password)) {
    //   console.log("inside verify invalidstring backend");
    //   return res
    //     .status(400)
    //     .json({ message: "Email id or password is missing" });
    // }
    console.log(uemail, upassword);
    const user = await userModel.findAll({ where: { email: uemail } });
    // console.log(user);
    if (user.length > 0) {
      console.log("inside backend if");
      bcrypt.compare(upassword, user[0].password, (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Something went wrong" });
        }
        if (result === true) {
          console.log("inside verify response backend");
          res
            .status(200)
            .json({ success: true, message: "user logged in successfully" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "password is incorrect" });
        }
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};
