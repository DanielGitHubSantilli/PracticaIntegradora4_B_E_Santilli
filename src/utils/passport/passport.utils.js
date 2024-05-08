import passport from "passport";

export const passportAuthenticate = (req, res, next) => {

      passport.authenticate('jwt', {
            session: false
      }, (error, user, info) => {

            if (error) {

                  return next(error);

            };

            if (!user) {

                  const error = new Error('No autorizado');

                  error.status = 401;

                  return next(error);

            };

            req.user = user;

            next();

      })(req, res, next);

};