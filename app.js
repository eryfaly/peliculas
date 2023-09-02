let pagina = 1;
        let idiomaSeleccionado = 'es-MX'; // Idioma predeterminado

        const btnAnterior = document.getElementById('btnAnterior');
        const btnSiguiente = document.getElementById('btnSiguiente');
        const btnEspanol = document.getElementById('btnEspanol'); // Botón para español
        const btnIngles = document.getElementById('btnIngles'); // Botón para inglés

        btnSiguiente.addEventListener('click', () => {
            if (pagina < 1000) {
                pagina += 1;
                cargarPeliculas();
            }
        });

        btnAnterior.addEventListener('click', () => {
            if (pagina > 1) {
                pagina -= 1;
                cargarPeliculas();
            }
        });

        btnEspanol.addEventListener('click', () => {
            idiomaSeleccionado = 'es-MX';
            cargarPeliculas();
        });

        btnIngles.addEventListener('click', () => {
            idiomaSeleccionado = 'en-US'; 
            cargarPeliculas();
        });

        const cargarPeliculas = async () => {
            try {
                const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=${idiomaSeleccionado}&page=${pagina}`);

                console.log(respuesta);

                // Si la respuesta es correcta
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();

                    let peliculas = '';
                    datos.results.forEach(pelicula => {
                        peliculas += `
                            <div class="pelicula">
                                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                                <h3 class="titulo">${pelicula.title}</h3>
                            </div>
                        `;
                    });

                    document.getElementById('contenedor').innerHTML = peliculas;

                } else if (respuesta.status === 401) {
                    console.log('Pusiste la llave mal');
                } else if (respuesta.status === 404) {
                    console.log('La película que buscas no existe');
                } else {
                    console.log('Hubo un error y no sabemos qué pasó');
                }

            } catch (error) {
                console.log(error);
            }
        }

        cargarPeliculas();

        const selectGeneros = document.querySelector("btngeneros");

        fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmU4N2QyMmVlMDQ0MDBmYjA5ZjJkM2I0ODNlNTY1OCIsInN1YiI6IjY0ZWE4YjFlYzVjMWVmMDBhZDNkZTk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PqtwMzk9s4i4JLPDsq7XJrzHCovhfTVYJW8KSnyWg04"
          }
        })
          .then(response => response.json())
          .then(generos => {
           
            for (const genero of generos) {
              const option = document.createElement("option");
              option.text = genero.name;
              option.value = genero.id;
              selectGeneros.appendChild(option);
            }

            
          });

   