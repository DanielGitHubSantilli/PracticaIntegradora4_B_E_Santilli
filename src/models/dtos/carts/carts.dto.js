import crypto from 'crypto';
import cartsModel from "../../schemas/carts.schema.js";
import productsModel from "../../schemas/products.schema.js";
import ticketModel from "../../schemas/ticket.schema.js";

export class GetCartDTO {

    constructor(code) {

        this.code = code;

    }

    async prepareData() {

        const cart = await cartsModel.findOne({

            code: this.code

        }).populate('products.product').lean();

        if (!cart) {

            throw new Error('El carrito no existe');

        }

        return cart;

    };

}

export class SaveCartDTO {

    constructor(user) {

        this.user = user;

    }

    async prepareData() {

        const code = crypto.randomBytes(10).toString('hex');

        const cart = new cartsModel({
            code: code,
            user: this.user,
            products: []
        });

        return cart;

    }

}

export class DeleteCartDTO {

    constructor(code, productId) {
        this.code = code;
    }

    async prepareData() {

        const cart = await cartsModel.findOne({

            code: this.code

        });

        return cart;

    };

};

export class AddProductDTO {

    constructor(code, productId, quantity, user) {

        this.code = code;
        this.productId = productId;
        this.quantity = quantity;
        this.user = user;

    };

    async prepareData() {

        const product = await productsModel.findOne({

            _id: this.productId

        });

        if (!product) {

            throw new Error('El producto no existe');

        };

        if (product.stock < this.quantity) {

            throw new Error('No hay suficiente stock del producto');

        };

        const cart = await cartsModel.findOne({

            code: this.code

        })

        if (!cart) {

            throw new Error('El carrito no existe');

        };

        const ownerId = product.owner.toString();

        if (this.user.role === 'ADMIN' || this.user.role === 'PREMIUM') {

            if (ownerId === this.user.id) {

                throw new Error('No puedes comprar tus propios productos');

            };

        };

        const price = product.price;
        const productId = product._id;

        const productInCart = cart.products.find(p => p.product.toString() === this.productId);

        if (productInCart) {

            productInCart.quantity += Number(this.quantity);

        } else {

            const productToAdd = {
                product: productId,
                price: price,
                quantity: Number(this.quantity)
            };

            console.log(productToAdd);

            cart.products.push(productToAdd);

        }

        return cart;

    };

};

// FALTA IMPLEMENTAR

export class DeleteProductFromCartDTO {

    constructor(code, productId) {
        this.code = code;
        this.productId = productId;
    }

    async prepareData() {

        const cart = await cartsModel.findOne({

            code: this.code

        });

        const productIndex = cart.products.findIndex(p => p.product.toString() === this.productId);

        if (productIndex > -1) {

            cart.products.splice(productIndex, 1);

        };

        return cart;

    };

};

// FALTA IMPLEMENTAR


export class PurchaseCartDTO {

    constructor(code) {

        this.code = code;

    }

    async prepareData() {

        const cart = await cartsModel.findOne({

            code: this.code

        }).populate('products.product');

        if (!cart) {

            throw new Error('El carrito no existe');

        };

        const productsNotProcessed = [];

        let amount = 0;

        for (let product of cart.products) {

            const productInDB = await productsModel.findOne({

                _id: product.product._id

            });

            if (productInDB.stock < product.quantity) {

                productsNotProcessed.push(product.product._id);
                continue;

            };

            productInDB.stock -= product.quantity;

            await productInDB.save();

            amount += product.product.price * product.quantity;

        }

        cart.products = cart.products.filter(product => productsNotProcessed.includes(product.product._id));

        await cart.save();

        const purchase = {

            code: crypto.randomBytes(10).toString('hex'),
            purchase_datetime: new Date(),
            amount: amount,
            purchaser: 'test@gmail.com'

        };

        const ticket = new ticketModel(purchase);
        await ticket.save();

        return {
            ticket,
            productsNotProcessed
        }
    }
};