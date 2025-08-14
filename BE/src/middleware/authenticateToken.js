import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NO_TOKEN,INVALID_TOKEN } from "../modules/Statics/staticStrings.js";


dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: NO_TOKEN });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: INVALID_TOKEN });
    req.user = user;
    next();
  });
};
