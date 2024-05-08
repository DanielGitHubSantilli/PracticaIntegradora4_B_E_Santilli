const resetPasswordRequestForm = document.getElementById('resetPasswordRequestForm');

resetPasswordRequestForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(resetPasswordRequestForm);

    const obj = {}

    data.forEach((value, key) => {
        obj[key] = value;
    });

    fetch('/api/users/sendResetPassword', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => {

        if (response.status === 200) {

            alert('Se ha enviado un email con las instrucciones para reestablecer la contraseña');

        } else {
            console.log(response);
            alert('Error al enviar el email');
        }
    });
});