const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {

      e.preventDefault();

      const data = new FormData(form);

      const obj = {}

      data.forEach((value, key) => {
            obj[key] = ['email'].includes(key) ? value.toLowerCase() : value;
      });

      if (obj.email !== 'admincoder@coder.com') {

            fetch('/api/users/login', {
                  method: 'POST',
                  body: JSON.stringify(obj),
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')} `
                  }

            }).then(response => {

                  if (response.status === 200) {

                        response.json().then(data => {

                              localStorage.setItem('token', data.token);

                              alert('Bienvenido');

                              window.location.href = '/profile';

                        });

                  } else {

                        console.log(response);

                  }

            });

      } else {

            fetch('/api/users/login/admin', {
                  method: 'POST',
                  body: JSON.stringify(obj),
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')} `
                  }

            }).then(response => {

                  if (response.status === 200) {

                        response.json().then(data => {

                              localStorage.setItem('token', data.token);

                              alert('Bienvenido');

                              window.location.href = '/profile';

                        });

                  } else {

                        console.log(response);

                  }

            });
      }


});