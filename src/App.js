import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  // Citas en local Storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  // Arreglo de citas
  const [citas, guardarCitas] = useState([citasIniciales]);
  // Use Efeect para realizar ciertas operaciones cuando el estado cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  // Funcion citas actuales y agregamos la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };
  // Funcion que elimina una cita por su id

  const eliminarCita = (id) => {
    const nuevaCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevaCitas);
  };

  // mensaje condicionales
  const titulo = citas.length === 0 ? "No hay citas " : "administra tus Citas";
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>;
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
