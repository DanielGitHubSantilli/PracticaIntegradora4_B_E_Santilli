import mongoose from 'mongoose';

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({

      first_name: {
            type: String,
            required: true,
      },

      last_name: {
            type: String,
            required: true,
      },

      email: {
            type: String,
            required: true,
            unique: true,
      },

      age: {
            type: Number,
            required: true,
      },

      password: {
            type: String,
            required: true,
      },

      role: {
            type: String,
            enum: ['ADMIN', 'USER', 'PREMIUM'],
            default: 'USER',
      },

      phone: {
            type: String,
      },

      date_created: {
            type: Date,
            default: Date.now,
      },

      password_reset_token: {
            type: String,
      },

      password_reset_expires: {
            type: Date,
      },

      documents: [{
            name: {
                  type: String,
                  required: true
            },
            reference: {
                  type: String,
                  required: true
            },
            extension: {
                  type: String,
                  required: true
            },
      }],

      last_connection: {
            type: Date
      },

});

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;