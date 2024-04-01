import { where } from "sequelize";
import db from "../models/index";
import userService from "../services/userService";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
let handleGetAllContact = async (req, res) => {
  try {
    let info = await userService.handleGetAllContact();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleLoging = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  //check id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing input parameter",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

//
let getallCode = async (req, res) => {
  try {
    let response = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleGetCustomer = async (req, res) => {
  try {
    let data = await userService.handleGetCustomer(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleSaveUser = async (req, res) => {
  try {
    let response = await userService.handleSaveUser(req.body);
    return res.status(200).json({
      errCode: 0,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMsg: "error from server",
    });
  }
};
let postVerifyBookAppointment = (req, res) => {
  try {
    let response = userService.postVerifyBookAppointmentService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error form server",
    });
  }
};
let handleSaveContract = async (req, res) => {
  try {
    let response = await userService.handleSaveContract(req.body);
    return res.status(200).json({
      errCode: 0,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMsg: "error from server",
    });
  }
};
let signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(200).json({ error: "Passwords don't match" });
    }
    const user = await db.User.findOne({ where: { email } });

    if (user) {
      return res.status(200).json({ error1: "Username already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
    const imageBase64 = new Buffer(boyProfilePic, "base64").toString("binary");
    const newUser = new db.User({
      email,
      password: hashedPassword,
      roleId: "R3",
      image: imageBase64,
    });

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser.id, res);
      await newUser.save();

      res.status(201).json({
        id: newUser.id,
        roleId: newUser.roleId,
        email: newUser.email,
        profilePic: newUser.image,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email, roleId: "R3" } });

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user.id, res);
    console.log("user", user);
    const res1 = res.status(200).json(user);
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

let logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  signup,
  login,
  logout,
  handleSaveContract,
  handleSaveUser,
  handleGetCustomer,
  handleLoging: handleLoging,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getallCode: getallCode,
  postVerifyBookAppointment,
  handleGetAllContact,
};
