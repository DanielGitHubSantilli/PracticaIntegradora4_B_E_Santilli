const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {

  const token = localStorage.getItem('token');

  button.addEventListener('click', async () => {

    try {

      const productId = button.dataset.productId;
      const cartId = 37;

      const response = await fetch(`/api/carts/${cartId}`, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify({
          products: [{
            product: productId,
            quantity: 1
          }]
        })

      });

      if (response.ok) {

        alert('Producto agregado al carrito');

      } else {

        alert('Error al agregar el producto al carrito');

      }

    } catch (error) {

      throw new Error(error);

    }

  });

});