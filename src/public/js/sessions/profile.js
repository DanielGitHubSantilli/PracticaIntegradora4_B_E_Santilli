const form = document.getElementById('profileForm');

form.addEventListener('submit', (e) => {

      e.preventDefault();

      const data = new FormData(form);

      const obj = {}

      data.forEach((value, key) => {
            obj[key] = ['email', 'first_name', 'last_name'].includes(key) ? value.toLowerCase() : value;
      });

      if (obj.email) {

            fetch(`/api/users/update/${obj.email}`, {

                  method: 'PUT',
                  body: JSON.stringify(obj),
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }

            }).then(result => {

                  if (result.status === 200) {

                        alert('Perfil actualizado correctamente');
                        localStorage.setItem('token', result.token);
                        window.location.href = '/profile';

                  } else {

                        alert('Error al actualizar el perfil');

                  };

            })
      } else {

            alert('El email no puede estar vacío');

      };

});

const deleteForm = document.getElementById('deleteForm');

deleteForm.addEventListener('submit', (e) => {

      e.preventDefault();

      const data = new FormData(deleteForm);

      const obj = {}

      data.forEach((value, key) => {
            obj[key] = ['email'].includes(key) ? value.toLowerCase() : value;
      });

      fetch('/api/users/delete/', {

            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')} `
            }

      }).then(response => {

            if (response.status === 200) {

                  response.json().then(data => {

                        localStorage.removeItem('token');

                        setTimeout(() => {
                              window.location.replace('/login');
                        }, 1250);

                  });

            } else {

                  alert('Error al eliminar el usuario');

            }


      });

});