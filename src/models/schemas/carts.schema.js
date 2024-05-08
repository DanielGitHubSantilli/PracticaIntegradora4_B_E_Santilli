import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        price: {
            type: Number,
            required: true,
        },
    }, ],
    code: {
        type: String,
        required: true,
        unique: true,
    },

    date_created: {
        type: Date,
        default: Date.now(),
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }

});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;