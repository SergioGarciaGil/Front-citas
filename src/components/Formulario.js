import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Formulario = ({ crearCita }) => {
  // Crear State de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  // crear nuevo State de error paraz

  const [error, actualizarError] = useState(false);

  // Función que se ejecuta cada vez que el usuario escribe en el input
  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };
  // Extraer Valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;
  // Cuando el usuario presiona agregar Cita
  const submitCita = (e) => {
    e.preventDefault();
    // Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }

    // Asignar Id
    cita.id = uuidv4();
    // console.log(cita);

    // Crear la cita

    crearCita(cita);

    // Reiniciar el formato
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h1>Crear cita</h1>;
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeHolder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeHolder="Nombre dueño Mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label>fecha</label>
        <input
          type="Date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
          // placeHolder="Nombre Mascota"
        />
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          // placeHolder="Nombre Mascota"
          onChange={actualizarState}
          value={hora}
        />
        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary ">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
