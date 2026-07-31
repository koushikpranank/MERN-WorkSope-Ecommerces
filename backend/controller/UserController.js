//register
//login
//get all users
//delete user
//update user

const bcrypt=require("bcrypt");
const Users=require("../model/users");
const jwt=require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const trimmedPassword = password?.trim();

    if (!normalizedEmail || !trimmedPassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user already exists
    const foundUser = await Users.findOne({ email: normalizedEmail });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Create new user
    const newUser = await Users.create({
      ...rest,
      email: normalizedEmail,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const foundUser = await Users.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let isPasswordValid = false;
    if (foundUser.password && foundUser.password.startsWith('$2')) {
      isPasswordValid = await bcrypt.compare(password, foundUser.password);
    } else {
      isPasswordValid = password === foundUser.password;
      if (isPasswordValid) {
        const hashedPassword = await bcrypt.hash(password, 10);
        foundUser.password = hashedPassword;
        await foundUser.save();
      }
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { role: foundUser.role, username: foundUser.firstName },
      process.env.secret_key,
      { expiresIn: "10m" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Failed to login" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const foundUsers = await Users.find();
    if (foundUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users: foundUsers });
  } catch (e) {
    return res.status(500).json({ message: "Failed to get users" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (deletedUser==null) {
      return res.status(404).json({ message: "invalid user id" });
    }

    return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (e) {
    return res.status(500).json({ message: "Failed to delete user" });
  }
};



module.exports={register,login,getAllUsers,deleteUser};
/*
object structuring object structinr mens class into the form of object and then we can use it in the form of object

example const student={
name:lokesh,
age:20};
console.log(student.name);
cosole.log(student.age);

object destructuring is a feature in JavaScript that allows you to extract values from objects and assign them to variables in a more concise way. 
It provides a convenient syntax for unpacking properties from objects into distinct variables.

const{name,age}=students;
console.log(name);
console.log(age);
*/  
/* array destructuring is a feature in JavaScript that allows you to extract values from arrays and assign them to variables in a more concise way.
It provides a convenient syntax for unpacking elements from arrays into distinct variables.
const numbers=[1,2,3,4,5];
const [first,second,third]=numbers;
console.log(first);
console.log(second);
console.log(third);
*/
/*
spread operator is a feature in JavaScript that allows you to expand elements of an iterable (such as an array or object) into individual elements.
It provides a convenient syntax for spreading the elements of an array or object into another array or object.
example
const numbers=[1,2,3];
const newNumbers=[...numbers,4,5];
console.log(newNumbers);
*/
