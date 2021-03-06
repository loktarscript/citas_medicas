import React, { Fragment, useState } from 'react';
import { uuid } from 'uuidv4'
import PropTypes from 'prop-types';

export const Formulario = ({crearCita}) => {
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, setError] = useState(false);

    //Se ejecuta cada vez que el usuario escribe en un input
    const handleChange = e =>{
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //cuando presionan agregar cita
    const submitCita = e => {
        e.preventDefault();

        //validar campos
        if(mascota.trim() === '' || propietario.trim() === '' ||fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            setError(true);
            return;
        }

        //Eliminar mensaje de error
        setError(false);

        //asignar ID
        cita.id = uuid();

        //Crear la cita
        crearCita(cita);
        //Reinicar Form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    };

    const { mascota, propietario, fecha, hora, sintomas} = cita;
    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {
                error ? <p className="alerta-error"> Todos los campos son obligatorios</p> : null
            }
            <form>
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño mascota"
                    onChange={handleChange}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                    onClick={submitCita}
                >Agregar Cita</button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
