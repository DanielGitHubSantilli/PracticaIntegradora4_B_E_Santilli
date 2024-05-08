import bcrypt from 'bcrypt';

export const createHash = (password) => {

      const salt = bcrypt.genSaltSync(10);

      const hash = bcrypt.hashSync(password, salt);

      return hash;

};

export const compareHash = (password, user) => {

      const compare = bcrypt.compareSync(password, user.password);

      return compare;

};