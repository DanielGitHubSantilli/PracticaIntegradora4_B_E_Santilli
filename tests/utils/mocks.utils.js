import CONFIG from "../../src/config/environment/config.js";
import {
      createHash
} from "../../src/utils/bcrypt/bcrypt.utils.js";
import mongoose from "mongoose";

// Se define la función para generar un usuario de prueba
function generateMockUser(options = {}) {

      // Se define un usuario por defecto
      const defaultUser = {
            first_name: 'Usuario Test',
            last_name: 'Test',
            email: 'test@gmail.com',
            age: 25,
            password: 'testpassword',
      };

      // Se sobreescriben las opciones por defecto con las opciones pasadas como parámetro
      return {
            ...defaultUser,
            ...options,
      };
}

// Se define el usuario admin
const admin = CONFIG.ADMIN;

// Se exporta el objeto con los usuarios de prueba
export const mockUsers = {
      mockUser: generateMockUser(),
      mockRegisterUser: generateMockUser({
            confirm_password: 'testpassword'
      }),
      mockPremiumUser: generateMockUser({
            confirm_password: 'testpassword',
            role: 'PREMIUM'
      }),
      mockUserPassWrong: generateMockUser({
            password: 'wrongpassword',
            confirm_password: 'wrongpassword',
      }),
      mockUserConfirmPassWrong: generateMockUser({
            confirm_password: 'wrongpassword',
      }),
      mockUserEmailWrong: generateMockUser({
            confirm_password: 'testpassword',
            email: 'test@invalid.com',
      }),
      mockUserDB: generateMockUser({
            _id: new mongoose.Types.ObjectId(),
            password: createHash('testpassword'),
            role: 'USER',
            date_created: Date.now(),
      }),
      mockUpdatedUser: generateMockUser({
            confirm_password: 'testpassword',
            first_name: 'Usuario Test Actualizado',
            phone: '1234567890',
      }),
      mockAdminUser: {
            first_name: admin.first_name,
            last_name: admin.last_name,
            email: admin.email,
            password: admin.password,
            role: admin.role,
      },
      mockLoginAdminUser: {
            email: admin.email,
            password: process.env.UNHASHED_PASSWORD,
      },
      mockWrongAdminUser: {
            email: 'admin@invalid.com',
            password: 'invalidpassword',
      },
}


function generateMockCart(options = {}, product) {

      const defaultCart = {

            products: product ? [{
                  product: product._id,
                  quantity: 1,
                  price: product.price,
            }] : [],
            code: 'XYZ123',
            date_created: Date.now(),
            user: new mongoose.Types.ObjectId(),
      };

      return {
            ...defaultCart,
            ...options,
      };

}

export const mockCarts = {

      mockCart: generateMockCart(),

}

function generateMockProduct(options = {}) {

      // Producto predeterminado
      const defaultProduct = {
            title: 'Producto Test',
            description: 'Descripción del producto test',
            code: 'PROD_TEST',
            price: 100.00,
            status: true,
            stock: 10,
            category: 'general',
            thumbnails: [],
            id: 1,
            owner: new mongoose.Types.ObjectId(),
      };

      // Sobrescribe los valores predeterminados con las opciones proporcionadas
      return {
            ...defaultProduct,
            ...options,
      };
}

export const mockProducts = {
      mockProduct: generateMockProduct(),
};