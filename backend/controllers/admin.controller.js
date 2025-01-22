import { z } from "zod";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { Admin } from "../models/admin.model.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const adminSchema = z.object({
    firstName: z
      .string()
      .min(3, { message: "firstName must be atleast 3 char long" }),
    lastName: z
      .string()
      .min(3, { message: "lastName must be atleast 3 char long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "password must be atleast 6 char long" }),
  });

  const validatedData = adminSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res
      .status(400)
      .json({ errors: validatedData.error.issues.map((err) => err.message) });
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await newAdmin.save();
    res.status(201).json({
      message: "signup successful",
      newAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "error in signup" });
    console.log("Error is signup", error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    const isPasswordCorrect = await bcryptjs.compare(password, admin.password);

    if (!admin || !isPasswordCorrect) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    //jwt code
    const token = jwt.sign(
      {
        id: admin._id,
      },
      config.JWT_ADMIN_PASSWORD,
      {expiresIn : "1d"},
    );

    const cookieoptions = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict"
    }

    res.cookie("jwt", token,cookieoptions);
    res.status(201).json({ message: "login successful", admin, token });
  } catch (error) {
    res.status(500).json({ message: "error in login" });
    console.log("Error is login", error);
  }
};

export const logout = async (req, res) => {
  try {
    if(!req.cookies.jwt){
        return res.status(401).json({ errors: "Kindely login first" }); 
    }
    res.clearCookie("jwt");
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    res.status(500).json({ message: "error in logout" });
    console.log("Error is logout", error);
  }
};