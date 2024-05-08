import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import CONFIG from '../environment/config.js';
import { createHash } from '../../utils/bcrypt/bcrypt.utils.js';
import { UsersMongoDAO } from '../../models/daos/mongo/users/users.mongo.dao.js';

const initPassport = () => {

      const cltId = CONFIG.GITHUB.clientID;
      const cltSecret = CONFIG.GITHUB.clientSecret;
      const cltURL = CONFIG.GITHUB.clientURL;

      const UsersDAO = new UsersMongoDAO();

      passport.serializeUser((user, done) => {

            done(null, user._id);

      });

      passport.deserializeUser(async (id, done) => {
            try {

                  const payload = {
                        id: id,
                        pass: true
                  };

                  const user = await UsersDAO.getOne(payload);

                  done(null, user);

            } catch (error) {

                  done(error);

            };

      });

      passport.use('github', new GitHubStrategy({

            clientID: cltId,
            clientSecret: cltSecret,
            callbackURL: cltURL,

      }, async (accessToken, refreshToken, profile, done) => {
            try {

                  const payload = {
                        email: profile._json.email ? profile._json.email : profile._json.login,
                        login: profile._json.login,
                  };

                  const processedEmail = payload.email ? payload.email.toLowerCase() : payload.login.toLowerCase();

                  const user = await UsersDAO.getOne(payload);

                  if (user) {
                        return done(null, user);
                  } else {

                        const first_name = profile._json.name.split(' ')[0];
                        const last_name = profile._json.name.split(' ')[1];

                        const newUser = {
                              first_name: first_name ? first_name : 'a',
                              last_name: last_name ? last_name : 'a',
                              age: profile._json.age ? profile._json.age : 0,
                              email: processedEmail + '@github.com',
                              password: createHash(profile._json.node_id),
                        };

                        let result = await UsersDAO.addOne(newUser);

                        return done(null, result);
                  };
            } catch (error) {

                  return done(error);

            }

      }));



};

export default initPassport;