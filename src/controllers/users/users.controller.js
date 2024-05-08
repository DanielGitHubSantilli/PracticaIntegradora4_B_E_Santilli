import {
      successResponse,
      errorResponse
} from '../../utils/responses/responses.utils.js';

import {
      getRepositories
} from '../../models/repositories/index.repository.js';

import {
      generateJWT,
      verifyJWT
} from '../../utils/JWT/jwt.utils.js';


import CONFIG from '../../config/environment/config.js';

import {
      sendWelcomeEmail,
      sendGoodbyeEmail,
      sendResetPassword,
      sendResetPasswordConfirmation
} from '../../utils/mailing/mailing.utils.js';


const {
      usersRepository
} = getRepositories();

export class UsersController {

      static async getAll(req, res, next) {

            try {

                  const result = await usersRepository.getAll();

                  res.status(200).json({
                        status: "success",
                        message: `Usuarios encontrados correctamente`,
                        payload: result
                  });

            } catch (error) {

                  req.logger.warning({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                  });

                  res.status(401).json({
                        message: error.message
                  });

            };

      };

      static async loginOne(req, res, next) {

            try {

                  const payload = req.body;

                  const user = await usersRepository.getOne(payload);

                  if (!user && payload.email) {
                        req.logger.warning(`El usuario ${payload.email ? payload.email : payload.id}, no existe`);
                        res.status(400).json({
                              message: `El usuario ${payload.email ? payload.email : payload.id}, no existe`
                        });
                        return;
                  }

                  try {

                        const userToLogin = await usersRepository.loginOne(payload, user);

                        const response = successResponse(userToLogin);
                        if (response.payload.password) response.payload.password = undefined;

                        const token = generateJWT(response.payload);

                        res.cookie('auth', token, {
                              maxAge: 60 * 60 * 1000,
                        });

                        res.status(200).json({
                              message: `Usuario ${payload.email ? payload.email : payload.id}, encontrado correctamente`,
                              response,
                              token: token
                        });


                  } catch (error) {

                        req.logger.warning({
                              message: error.message,
                              method: req.method,
                              url: req.originalUrl,
                              date: new Date().toLocaleDateString(),
                        });

                        res.status(401).json({
                              message: error.message
                        });

                  };

            } catch (error) {

                  let errorAt = error.stack ? error.stack.split('\n    at ')[10] : '';

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        At: errorAt
                  });

                  res.status(500).json({
                        status: 'error',
                        message: error.message,
                  });

            };

      };

      static async addOne(req, res, next) {

            try {

                  const payload = req.body;

                  try {

                        const exist = await usersRepository.getOne(payload.email);

                        if (exist) {
                              req.logger.warning(`El usuario ${payload.email}, ya existe`);
                              res.status(400).json({
                                    message: `El usuario ${payload.email}, ya existe`
                              });
                              return;
                        }

                        const newUser = await usersRepository.addOne(payload);

                        const response = successResponse(newUser);

                        if (response.payload.password) response.payload.password = undefined;

                        res.status(201).json({
                              message: `Usuario ${payload.email}, creado correctamente`,
                              response
                        });

                        try {

                              await sendWelcomeEmail(payload.email);

                        } catch (error) {
                              req.logger.error('Error al enviar correo de bienvenida:', error);
                        }


                  } catch (error) {

                        let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

                        req.logger.error({
                              message: error.message,
                              method: req.method,
                              url: req.originalUrl,
                              date: new Date().toLocaleDateString(),
                              At: errorAt
                        });

                        res.status(500).json({
                              status: 'error',
                              message: error.message,
                        });

                  };

            } catch (error) {

                  let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        At: errorAt
                  });

                  res.status(500).json({
                        status: 'error',
                        message: error.message,
                  });

            };

      };

      static async logout(req, res, next) {

            try {

                  const token = req.cookies.auth;

                  const user = req.user;

                  if (!user) {
                        req.logger.warning(`El usuario ${user.email}, no existe`);
                        return;
                  }

                  res.clearCookie('auth');

                  res.status(200).json({
                        status: 'success',
                        message: `Usuario ${user.email}, desconectado correctamente`
                  });

            } catch (error) {

                  let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        At: errorAt
                  });

                  res.status(500).json({
                        status: 'error',
                        message: error.message,
                  });

            };

      };

      static async uploadDocuments(req, res, next) {

            try {

                  const _id = req.params.id;
                  const files = req.files;

                  const updatedUser = await usersRepository.uploadDocuments(_id, files);

                  const response = successResponse(updatedUser);

                  if (response.payload.password) response.payload.password = undefined;

                  res.status(200).json({
                        status: "success",
                        message: `Documentos de usuario ${updatedUser.email}, actualizados correctamente`,
                        payload: response.payload
                  });

            } catch (error) {

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        stack: error.stack
                  });

                  res.status(500).json({
                        status: 'error',
                        message: error.message,
                  });

            }

      };

      static async updateRole(req, res, next) {

            try {

                  const _id = req.params.id;
                  const body = req.body;
                  const payload = {
                        email: body.email,
                        _id: _id,
                  }

                  const user = await usersRepository.updateRole(payload);

                  if (!user) {
                        req.logger.warning(`El usuario ${payload}, no existe`);
                        res.status(400).json({
                              message: `El usuario ${payload}, no existe`
                        });
                        return;
                  }

                  const response = successResponse(user);

                  if (response.payload.password) response.payload.password = undefined;

                  res.status(200).json({
                        status: "success",
                        message: `Usuario ${payload}, actualizado correctamente`,
                        payload: response.payload
                  });


            } catch (error) {

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        stack: error.stack
                  });

                  res.status(500).json({
                        status: 'error',
                        message: error.message,
                  });

            }

      }

      static async updateOne(req, res, next) {

            try {

                  const email = req.user.email;

                  const payload = req.body;

                  const exist = await usersRepository.getOne(email);

                  if (!exist) {
                        req.logger.warning(`El usuario ${email}, no existe`);
                        res.status(400).json({
                              message: `El usuario ${email}, no existe`
                        });
                        return;
                  }

                  const updatedUser = await usersRepository.updateOne(exist, payload);

                  const response = successResponse(updatedUser);

                  const token = generateJWT(response.payload);

                  res.clearCookie('auth');

                  res.cookie('auth', token, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 1000,
                  });

                  if (response.payload.password) response.payload.password = undefined;

                  res.status(200).json({
                        message: `Usuario ${exist.email}, actualizado correctamente`,
                        response
                  });

            } catch (error) {

                  let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        At: errorAt
                  });

                  res.status(500).json({
                        status: 'error',
                        message: error.message,
                  });

            };

      };

      static async deleteOne(req, res, next) {

            try {

                  const payload = req.user;

                  const body = req.body;

                  const email = body.email ? body.email : payload.email;

                  const user = await usersRepository.getOne(email);

                  if (!user) {
                        req.logger.warning(`El usuario ${email}, no existe`);
                        res.status(400).json({
                              message: `El usuario ${email}, no existe`
                        });
                        return;
                  }

                  const deletedUser = await usersRepository.deleteOne({
                        email: user.email
                  });

                  const response = successResponse(deletedUser);

                  if (response.payload.password) response.payload.password = undefined;

                  res.clearCookie('auth');

                  res.status(200).json({
                        message: `Usuario ${deletedUser.email}, eliminado correctamente`,
                        response
                  });

                  try {
                        await sendGoodbyeEmail(payload.email);
                  } catch (error) {
                        req.logger.error('Error al enviar correo de despedida:', error);
                        res.status(500).json({
                              status: 'error',
                              message: error.message,
                        });
                  }


            } catch (error) {

                  let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        At: errorAt
                  });

                  res.status(500).json({
                        status: 'error',
                        message: error.message,
                  });

            };

      };

      static async loginAdmin(req, res, next) {

            try {

                  const payload = req.body;

                  const admin = await usersRepository.loginAdmin(payload);

                  const response = successResponse(admin);

                  if (!response.payload) {
                        req.logger.warning(`El usuario ${payload.email ? payload.email : payload.id}, no existe`);
                        res.status(400).json({
                              message: `El usuario ${payload.email ? payload.email : payload.id}, no existe`
                        });
                        return;
                  }

                  if (response.payload.password) response.payload.password = undefined;

                  const token = generateJWT(response.payload);

                  res.cookie('auth', token, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 1000,
                  });

                  res.status(200).json({
                        message: `Usuario ${payload.email ? payload.email : payload.id}, encontrado correctamente`,
                        response,
                        token: token
                  });

            } catch (error) {

                  let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        At: errorAt
                  });

            };

      };

      static async resetPasswordRequest(req, res, next) {

            try {

                  const payload = req.body;

                  const updatedUser = await usersRepository.createResetToken(payload);

                  if (!updatedUser) {
                        req.logger.warning(`El usuario ${payload.email}, no existe`);
                        res.status(400).json({
                              message: `El usuario ${payload.email}, no existe`
                        });
                        return;
                  }

                  res.status(200).json({
                        message: `Correo electrónico de restablecimiento de contraseña enviado a ${updatedUser.email}`,
                        endpoint: `${CONFIG.API_URL}/users/resetPassword?token=${updatedUser.password_reset_token}`
                  });

                  await sendResetPassword(updatedUser.email, updatedUser.password_reset_token);

            } catch (error) {

                  req.logger.error('Error al enviar correo de restablecimiento de contraseña:', error);

                  res.status(500).json({
                        status: 'error',
                        message: error.message,
                  });

            }

      };

      static async resetPassword(req, res, next) {

            try {

                  const token = req.params.token;

                  const payload = {
                        ...req.body,
                        token
                  }

                  const updatedUser = await usersRepository.resetPassword(payload);

                  await sendResetPasswordConfirmation(payload.email);

                  res.status(200).json({
                        message: `Contraseña de usuario ${updatedUser.email}, restablecida correctamente`
                  });

            } catch (error) {

                  next(error);

            }

      };

      static async loginGithub(req, res, next) {
            try {

                  const user = req.user;

                  const response = successResponse(user);

                  if (!response.payload) {
                        req.logger.warning(`El usuario ${user.email}, no existe`);
                        return;
                  }

                  if (response.payload.password) response.payload.password = undefined;

                  res.status(200).json({
                        message: `Usuario ${user.email}, encontrado correctamente`,
                        response
                  });

            } catch (error) {

                  let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        At: errorAt
                  });

            }

      }

      static async loginGithubCallback(req, res, next) {

            try {

                  if (req.user) {
                        res.redirect('/profile');
                  } else {
                        res.redirect('/login');
                  }

            } catch (error) {

                  let errorAt = error.stack ? error.stack.split('\n    at ')[1] : '';

                  req.logger.error({
                        message: error.message,
                        method: req.method,
                        url: req.originalUrl,
                        date: new Date().toLocaleDateString(),
                        At: errorAt
                  });

            };

      };

};