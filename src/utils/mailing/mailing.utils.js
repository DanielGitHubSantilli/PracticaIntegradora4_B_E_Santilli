import nodemailer from 'nodemailer';
import CONFIG from '../../config/environment/config.js';

const MAIL = {
      user: CONFIG.MAIL.user,
      pass: CONFIG.MAIL.password
};

const TRANSPORTER = nodemailer.createTransport({

      service: 'gmail',
      port: 587,
      auth: {
            user: MAIL.user,
            pass: MAIL.pass
      }

});

// Para utilizar en un futuro con Mongo, en lugar de un archivo json
let MAILSTOSEND = [];

async function loadUsersToSend() {

      try {

            const data = await fs.readFile('usersToSend.json', 'utf8');
            const USERS = JSON.parse(data);
            MAILSTOSEND = Object.values(USERS);

      } catch (error) {

            console.error(error);

      };

};

export async function sendWelcomeEmail(email) {

      const HTML = `
      <h1>Bienvenido</h1>
      <div>
          <h2>Gracias por registrarte</h2>
      </div>
      <div>
              <p>Ya podes empezar a comprar</p>
      </div>

      <div>
                  <p>Saludos</p>
      </div>

      <div>
                  <h3> Como siempre, gracias por confiar en nosotros</h3>
      </div>

      `;

      const mailOptions = {
            from: MAIL.user,
            to: email,
            subject: 'Bienvenido',
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });

}

export async function sendGoodbyeEmail(email) {

      const HTML = `
      <h1>Adios</h1>
      <div>
          <h2>Gracias por haberte registrado</h2>
      </div>
      <div>
              <p>Esperamos que vuelvas pronto</p>
      </div>

      <div>
                  <p>Saludos</p>
      </div>

      <div>
                  <h3> Como siempre, gracias por confiar en nosotros</h3>
      </div>

      `;

      const mailOptions = {
            from: MAIL.user,
            to: email,
            subject: 'Adios',
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });

}

export async function sendResetPassword(email, token) {

      const now = new Date();

      const createdAt = now.toISOString();

      const HTML = `
      <h1>Recuperar contraseña</h1>
      <div>
          <h2>Para recuperar tu contraseña, ingresa al siguiente enlace</h2>
      </div>
      <div>
          <h3>(El enlace expira en 1 hora y en caso de que haya expirado, se te redirigirá a la página de recuperación de contraseña para solicitar uno nuevo)</h3>
      </div>
      <div>
              <p>http://localhost:8080/resetPassword?token=${token}&createdAt=${createdAt}</p>
      </div>

      <div>
                  <p>Saludos</p>
      </div>

      <div>
                  <h3> Como siempre, gracias por confiar en nosotros</h3>
      </div>

      `;

      const mailOptions = {
            from: MAIL.user,
            to: email,
            subject: 'Recuperar contraseña',
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });

}

export async function sendResetPasswordConfirmation(email) {

      const HTML = `
            <h1>Recuperar contraseña</h1>
            <div>
            <h2>Se ha cambiado tu contraseña</h2>
            </div>
            <div>
                  <p>Ya puedes ingresar con tu nueva contraseña</p>
            </div>
      
            <div>
                        <p>Saludos</p>
            </div>
      
            <div>
                        <h3> Como siempre, gracias por confiar en nosotros</h3>
            </div>
      
            `;

      const mailOptions = {
            from: MAIL.user,
            to: email,
            subject: 'Recuperar contraseña',
            html: HTML,
      };

      return new Promise((resolve, reject) => {
            TRANSPORTER.sendMail(mailOptions, (error, info) => {
                  if (error) {
                        reject(error);
                  } else {
                        resolve(info);
                  }
            });
      });

}