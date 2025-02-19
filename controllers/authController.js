import { User } from "../models/userModel.js";
import { HttpError } from "../utils/HttpError.js";
import { tryCatchDecorator } from "../utils/tryCatchDecorator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"; // must be imported in each place where you get any keys from process.env

import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import { sendEmail } from "../utils/sendEmail.js";

const { SECRET_KEY = "", BASE_URL } = process.env;

//# Moved to "upload" middleware
// const tempDir = path.join(__dirname, "../", "temp");
// const multerConfig = {
//   destination: tempDir,
// };
// export const upload = multer({ storage: multerConfig });
//#/ Moved to "upload" middleware

const register = async (req, res, next) => {
  //# Adding custom error message for 409 status when you validate uniq field (for example "email")
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // Find user with this email. If not found, returns "null"
  if (user) {
    throw HttpError({
      status: 409,
      message: `Email ${email} already in our db`,
    });
  }
  //#/ Adding custom error message for 409 status when you validate uniq field (for example "email")

  const hashedPassword = await bcrypt.hash(password, 10);
  const defaultAvatarURL = gravatar.url(email, {
    s: 200,
    protocol: true,
    d: "robohash", // або:
    //! mp,
    // identicon,
    // retro,
    //! robohash,
    //! wavatar
    // monsterid
    // blank
    // 404(Return error.Useful if you want to handle the absence of an avatar in your own way)
    // own picture: "default: 'https://example.com/my-default-avatar.png',"
  });
  const verificationCode = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL: defaultAvatarURL,
    verificationCode,
  });

  const verifyEmailData = {
    to: newUser.email, // Change to your recipient
    subject: "Verify your email",
    html: `<p>You received this message because you register on our site. If it was not you please ignore it. If it was you, please click on link below for confirm your email.</p>
    <a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click for verify email</a>`,
  };

  await sendEmail(verifyEmailData);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;

  // check whether in db user with those verificationCode
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError({
      status: 401,
      message: `Verification code not found`,
    });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({ message: "Email verify success" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError({
      status: 401,
      message: `Verification code not found`,
    });
  }

  // if user already verified but forgot it
  if (user.verify) {
    throw HttpError({
      status: 401,
      message: `User already verified`,
    });
  }

  const verifyEmailData = {
    to: email, // Change to your recipient
    subject: "Verify your email",
    html: `<p>You received this message because you register on our site. If it was not you please ignore it. If it was you, please click on link below for confirm your email.</p>
    <a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click for verify email</a>`,
  };

  await sendEmail(verifyEmailData);

  res.status(201).json({ message: "Verify email send success" });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError({
      status: 401,
      message: `Email or password invalid`,
    });
  }

  if (!user.verify) {
    throw HttpError({
      status: 401,
      message: `User not verified`,
    });
  }

  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    throw HttpError({
      status: 401,
      message: `Email or password invalid`,
    });
  }

  // Create and send token
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // console.log("login >> token:::", token);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

// Check whether token is still valid and send name&email
const getCurrentUser = (req, res, next) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

// Check whether token is still valid and send name&email
const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success" });
};

const changeAvatar = async (req, res) => {
  const errCb = err => {
    if (err) throw `err.message: ${err.message}`;
    console.log("Rename complete!");
  };

  const __dirname = import.meta.dirname; // here it is path to "controllers" folder
  const uploadAvatarsDir = path.join(__dirname, "../", "public", "avatars");

  const { _id } = req.user;

  // changeAvatar >> req.file::: {
  //   fieldname: 'avatarFile',
  //!  originalname: 'The Hammer and the Cross.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'D:\\Programming\\Node.js\\2024\\node-js-2024-hw\\m5-files-to-server\\temp',
  //!  filename: 'The_Hammer_and_the_Cross.jpg',
  //   path: 'D:\\Programming\\Node.js\\2024\\node-js-2024-hw\\m5-files-to-server\\temp\\The_Hammer_and_the_Cross.jpg',
  //   size: 41717
  // }

  const { path: tempDirWithFileName, filename } = req.file;
  const uniqFileName = `${_id}_${filename}`;
  const uploadDirWithFileName = path.join(uploadAvatarsDir, uniqFileName);
  await fs.rename(tempDirWithFileName, uploadDirWithFileName, errCb);

  // File name must have relative path, because file could be saved on some cloud instead PC, as in this example
  const avatarRelativePathWithFileName = path.join("avatars", uniqFileName); // Relative path on the server. The "public" word not needs because it showed in middleware "app.use(express.static

  await User.findByIdAndUpdate(_id, {
    avatarURL: avatarRelativePathWithFileName,
  });

  res.status(201).json({ avatarURL: avatarRelativePathWithFileName });
};

export const authController = {
  register: tryCatchDecorator(register),
  verifyEmail: tryCatchDecorator(verifyEmail),
  resendVerifyEmail: tryCatchDecorator(resendVerifyEmail),
  login: tryCatchDecorator(login),
  getCurrentUser: tryCatchDecorator(getCurrentUser), // can be without tryCatchDecorator
  logout: tryCatchDecorator(logout),
  changeAvatar: tryCatchDecorator(changeAvatar),
};
