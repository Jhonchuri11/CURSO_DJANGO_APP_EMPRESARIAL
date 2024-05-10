import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MainHeader() {
    
    // Definiendo variables
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        leerApiCurso()
    }, [])

    const leerApiCurso = async () => {
        const response = await axios.get("http://localhost:8000/api/v.1/listSemestres/");
          setSemesters(response.data);
    }

    return (
        // HEADER -->
        <nav className="navbar navbar-expand-lg navbar-dark text-bg-primary p-3">
            <div className="container px-5">
                <a className="navbar-brand" href="#!">CARRERA DE DISEÑO DE SOFTWARE</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {semesters.map(semestre => (
                        <li class="nav-item" className="nav-link active"  aria-current="page" key={semestre}>
                            <Link to={`/semestre/${semestre.id}`} style={{ textDecoration: 'none' }} 
                            className="text-white fw-bold">{semestre.nombre}</Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}