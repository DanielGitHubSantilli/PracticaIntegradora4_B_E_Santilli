import jwt from "jsonwebtoken";
import CONFIG from "../../config/environment/config.js";

const KEY = CONFIG.KEY;

export const generateJWT = (payload) => {

      const token = jwt.sign({
            payload
      }, KEY, {
            expiresIn: '12h'
      })

      return token;

};

export const verifyJWT = (token) => {
      const decoded = jwt.verify(token, KEY);
      return decoded;
};