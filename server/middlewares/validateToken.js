import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "no authorized" });
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "inavalid token" });
    req.user = user;
  });
  next();
};
