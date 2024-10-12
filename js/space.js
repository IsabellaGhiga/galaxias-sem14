const borrarBusqueda = () => {
  const contenedorImagen = document.getElementById('contenedor');
  contenedorImagen.innerHTML = '';
};

const mostrarImagenes = (imagenes) => {
  const contenedorImagen = document.getElementById('contenedor');
  imagenes.forEach((imagen) => {
    if (imagen.href) {
      const imageUrl = imagen.links[0].href;
      const { title, description, date_created } = imagen.data[0];
      contenedorImagen.innerHTML += `
              <div class="card" style="max-width: 18rem;">
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${description || 'Sin descripción'}</p>
                  <p class="card-text"><small class="text-muted">${date_created}</small></p>
                </div>
              </div>`;
    }
  });
};

const cargarImagenes = (texto) => {
  const urlNasa = `https://images-api.nasa.gov/search?q=${texto}`;
  fetch(urlNasa).then((resultadofetch) =>
    resultadofetch
      .json()
      .then((resultadoPromesa) => {
        console.log({ resultadoPromesa });
        mostrarImagenes(resultadoPromesa.collection.items);
      })
      .catch((error) => {
        console.error('Error al cargar las imagenes: ', error);
      })
  );
};

const clickBucar = () => {
  borrarBusqueda();
  const texto = document.getElementById('inputBuscar').value.toLowerCase();
  if (texto) {
    cargarImagenes(texto);
  }
};

const cargaInical = () => {
  document.getElementById('btnBuscar').addEventListener('click', clickBucar);
};

cargaInical();
