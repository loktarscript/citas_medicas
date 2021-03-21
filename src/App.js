import React, {Fragment, useState, useEffect} from 'react';
import { Cita } from './components/Cita';
import { Formulario } from './components/Formulario';

function App() {

  // citas en local storage 
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }


  //arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //use effect para x operaciones cuando el State cambia
  useEffect(() =>{
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  //Función que tome las citas actuales y add la nueva
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  };

  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row"></div>
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {
              citas.map(cita => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))
            }
          </div>
    </div>
    </Fragment>
    
  );
}

export default App;
