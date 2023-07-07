import User from "../models/user.model.js";
import { createToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["email already in use"]);
    const passwordHash = await bcrypt.hash(password, 10); // encriptamos la contraseña
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save(); // se gurda el objeto en la base de datos
    // creacion del token
    const token = await createToken({ id: userSaved._id });
    res.cookie("token", token); // se guarda el token en una cookie
    //respuesta del backEnd al frontEnd
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email }); // buscamos el usuario para ver si coincide con alguno de la db
    if (!userFound)
      return res.status(400).json({ message: "user doesn´t exist" });

    const isMatch = await bcrypt.compare(password, userFound.password); //si el usuario fue encontrado, se hace un acomparracion con la contraseña encriptada
    if (!isMatch) return res.status(400).json({ message: "invalid password" });

    const token = await createToken({ id: userFound._id }); // creación del token
    res.cookie("token", token); // se guarda el token en una cookie
    //respuesta del backEnd al frontEnd
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) res.status(400).json({ message: "user not found" });
  res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ mesaage: "unauthorized" });
  jwt.verify(token, secretKey, async (err, user) => {
    if (err) return res.status(401).json({ messagee: "Unauthorized" });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ messagee: "Unauthorized" });

    return res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username
    })
  });
};
