import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  // state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    
    const consultarApi= async () => {
      if(busqueda === '') return;
      
      const imagenesPorPagina = 30;
      const key = '12880394-5cbe731f0965b3a3f3b737631'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      console.log(resultado);
      
      guardarImagenes(resultado.hits);

      // Calcular el total de páginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina)
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');

      jumbotron.scrollIntoView({behavior: 'smooth'})

    }
    consultarApi();

  }, [busqueda, paginaActual])

  // Definir la página Anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1
    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  // Definir la página siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1
    if(nuevaPaginaActual > totalPaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }
  
  return (
    <div className="container">
      <div className="jumbotron">
        <p className='lead text-center'><strong>Buscador de Imágenes</strong></p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
    </div>
    <div className='row justify-content-center'>

      {(paginaActual < 2 && busqueda.trim() === '') ? null : (
        <button
          type='button'
          className='btn btn-info mr-1'
          onClick={paginaAnterior}
        >&laquo; Anterior
        </button>
      )}
      {(paginaActual === totalPaginas && busqueda.trim() === '') ? null : (
        <button
          type='button'
          className='btn btn-info ml-1'
          onClick={paginaSiguiente}
        >Siguiente &raquo;
        </button>
      )}

      <ListadoImagenes
        imagenes={imagenes}
      />
      {(paginaActual < 2 && busqueda.trim() === '') ? null : (
        <button
          type='button'
          className='btn btn-info mr-1'
          onClick={paginaAnterior}
        >&laquo; Anterior
        </button>
      )}
      {(paginaActual === totalPaginas && busqueda.trim() === '') ? null : (
        <button
          type='button'
          className='btn btn-info ml-1'
          onClick={paginaSiguiente}
        >Siguiente &raquo;
        </button>
      )}

    </div>
    </div>
  );
}

export default App;
