const Users = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
const Register = async (req, res) => {
  try {
    const userDetails = req.body;
    const foundUser = await Users.findOne({ email: userDetails.email });
    if (foundUser == null) {
      const hashedPassword = await bcrypt.hash(userDetails.password, 10);
      await Users.insertOne({ ...userDetails, password: hashedPassword });
      res.status(200).json({ message: "register successfully" });
    } else {
      res.status(501).json({ message: "user already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: "failed to register" });
    console.log(error);
  }
};

// login
const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await Users.findOne({ email: username });

    const isCorrectPassword = await bcrypt.compare(
      password,
      foundUser.password,
    );
    if (foundUser == null) {
      res.status(404).json({ message: "User Not found" });
    } else if (isCorrectPassword) {
      const token = await jwt.sign(
        { id: foundUser._id, role: foundUser.role, username: foundUser.email },
        process.env.Secret_Key,
        {
          expiresIn: "60M",
        },
      );
      res.status(200).json({ message: "Login Successful", token });
    } else {
      res.status(401).json({ message: "invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: "failed to login" });
    console.log(error);
  }
};

// get all users
const getUsers = async (req, res) => {
  try {
    const foundUsers = await Users.find(
      {},
      {
        firstName: 1,
        lastName: 1,
        email: 1,
        role: 1,
        phoneNo: 1,
        gender: 1,
        address: 1,
        state: 1,
      },
    );
    if (foundUsers.length == 0) {
      res.status(404).json({ message: "Users not Found" });
    }
    res.status(200).json({ foundUsers });
  } catch (error) {
    res.status(500).json({ message: "failed to get user details" });
  }
};
// delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (deletedUser == null) {
      res.status(404).json({ message: "invalid userId" });
    }
    res.status(200).json({ message: "user details deleted" });
  } catch (error) {
    res.status(500).json({ message: "failed to delete user details" });
  }
};
// update user Details
const updateUserDetails = async (req, res) => {
  try {
    const userDetails = req.body;
    if ((await Users.findById(req.params.id)) != null) {
      const hashedPassword = await bcrypt.hash(userDetails.password, 10);
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { ...userDetails, password: hashedPassword },
        {
          new: true,
        },
      );
      res.status(200).json({ message: "updated successfully", updatedUser });
    } else {
      res.status(404).json({ message: "invalid userID" });
    }
  } catch (error) {
    res.status(500).json({ message: "failed to update user details" });
  }
};
module.exports = {
  Register,
  Login,
  getUsers,
  deleteUser,
  updateUserDetails,
};
