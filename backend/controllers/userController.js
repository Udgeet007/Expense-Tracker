var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
let UserCollection = require("../modules/Usermodel");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  // const hashPassword = bcrypt.hashSync(password, salt);
  try {
    let hashPassword = bcrypt.hashSync(password, salt);
    let data = await UserCollection.create({
      name: name,
      email,
      password: hashPassword,
    });
    res.json({ msg: "user created successfully", success: true });
  } catch (error) {
    res.json({
      msg: "error in creating user",
      success: false,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    const findUser = await UserCollection.findOne({ email: email }); //key and value same hae to sirf yekh hi likho
    if (findUser) {
      let comparePassword = bcrypt.compareSync(password, findUser.password); // true
      if (comparePassword) {
        res.json({
          msg: "user logged in successfully",
          success: true,
          user: findUser,
        });
      } else {
        return res.json({ msg: "Invalid Password", success: false });
      }
    } else {
      return res.json({ msg: "user not found please sign up", success: false });
    }
  } catch (error) {
    res.json({
      msg: "Error in logIn User",
      success: false,
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { name, password } = req.body;
  let userId = req.params._id;
  if (password) {
    var hashedPassword = bcrypt.hashSync(password, salt);
  }

  let user = await UserCollection.findByIdAndUpdate(userId, {
    $set: { name, password: hashedPassword },
  });
  res.json({ msg: "user updated successfully!" });
};

const deleteUser = async (req, res) => {
  let userId = req.params._id;
  let user = await UserCollection.findByIdAndDelete(userId);
  res.json({ msg: "user deleted successfully", success: true });
};

module.exports = { createUser, loginUser, updateUser, deleteUser };
