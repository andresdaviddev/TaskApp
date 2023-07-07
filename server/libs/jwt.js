import { secretKey } from "../config.js";
import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, // payload
      secretKey, // secret
      {
        expiresIn: "24h", // opciones
      },
      (err, token) => {
        if(err) reject(err);
        resolve(token);
      }
    );
  });
};
