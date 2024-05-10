import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
export default function ListCurso() {

    // Definiendo variables para el recojo de los cursos a traves de los semestres
    const [listaCursosSemestre, setListCursosSemestre] = useState([]);
    const { semestre_id } = useParams();

    useEffect(() => {
        leerApiCursoSemestre()
    }, [semestre_id])

    const leerApiCursoSemestre = async () => {
        const response = await axios.get(`http://localhost:8000/api/v.1/curso/semestre/${semestre_id}/`);
          setListCursosSemestre(response.data);
    }
    return (
        //<!-- CONTENIDO-->
        <div className="container px-4 px-lg-5">
       
            <div className="card text-white text-bg-info p-3 fw-bold my-5 py-4 text-center " >
                <div className="card-body"><p class="text-white m-0">Lista de Cursos</p></div>
            </div>
            <div className="row gx-4 gx-lg-5">
                {listaCursosSemestre.map(curso => (
                <div className="col-md-4 mb-5" key={curso.id}>
                    <div className="card h-100">
                        <div className="card-body border border-primary p-2 border-opacity-10">
                            <h2 className="card-title">{curso.titulo}</h2>
                            <p className="card-text">{curso.descripcion}</p>
                        </div>
                    </div>
                </div>
                 ))}
            </div>
            
        </div>
        //<!-- CONTENIDO-->
    )
}