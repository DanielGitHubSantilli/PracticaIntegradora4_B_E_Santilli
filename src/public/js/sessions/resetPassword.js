const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const data = new FormData(resetPasswordForm);

    const obj = {}

    data.forEach((value, key) => {
        obj[key] = value;
    });

    fetch(`/api/users/resetPassword/${obj.token}`, {

        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(response => {

        if (response.status === 200) {

            alert('Contraseña actualizada con éxito');
            window.location.href = '/login';

        } else {

            console.error(response);

        }

    });

});