// authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./usersModel.js"; // link to the User model

export const registerUser = async (req, res) => {
  try {
    const { StaffNO, Password, Name, Surname, Role, District } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await User.create({
      StaffNO,
      Password: hashedPassword,
      Name,
      Surname,
      Role,
      District,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { StaffNO, Password } = req.body;

    const user = await User.findOne({ where: { StaffNO } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.UserID, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, role: user.Role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
