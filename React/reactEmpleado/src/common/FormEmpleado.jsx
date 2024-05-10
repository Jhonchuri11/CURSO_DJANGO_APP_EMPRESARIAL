import React, { useState } from 'react';

const FormEmpleado = ({ onSubmit }) => {
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [horasTra, setHorasTra] = useState('');
    const [salario, setSalario ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nombre, categoria, horasTra });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nombree:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

            <label>Categoria:</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                <option value="">Seleccionar categoria</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>

            <label>Horas trabajadas:</label>
            <input type="number" value={horasTra} onChange={(e) => setHorasTra(e.target.value)} required />

            <button type="submit">Calcular salario</button>
        </form>
    );
};

export default FormEmpleado;