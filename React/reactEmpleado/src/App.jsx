import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [horasTrabajadas, setHorasTrabajadas] = useState(0);
  const [pago, setPago] = useState(0);
  const [respuesta, setRespuesta] = useState('');

  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [listaEmpleadosFiltrado, setListaEmpleadosFiltrado] = useState([]);

  useEffect(() => {
    leerApi();
  }, []);

  const leerApi = async () => {
    const rutaApi = "http://127.0.0.1:8000/api/empleados/";
    const response = await fetch(rutaApi);
    const empleado = await response.json();
    setListaEmpleados(empleado);
    setListaEmpleadosFiltrado(empleado);
  };

  const handleCalcularPago = () => {
    // para calcular el salario del empleados
    if (categoria === 'A') {
      setPago(horasTrabajadas * 30);
    } else if (categoria === 'B') {
      setPago(horasTrabajadas * 20);
    } else if (categoria === 'C') {
      setPago(horasTrabajadas * 10);
    } else {
      setPago('');
    }
  };

  const handleEnviarDatos = async () => {
    console.log('Estado antes de enviar datos:', { nombre, categoria, horasTrabajadas, pago });
    // Validar que los campos requeridos estén completos
    if (!nombre || !categoria || !horasTrabajadas || !pago) {
      alert("Completar los campos antes de enviar")
      return alert;
    }

    try {
      // Enviar datos al backend
      const response = await fetch('http://127.0.0.1:8000/api/empleado/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          categoria: categoria,
          horasTrabajadas: parseFloat(horasTrabajadas),
          pago: parseFloat(pago),
        }),
      });
      const data = await response.json();
      setRespuesta(data);
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setRespuesta({ error: 'Hubo un problema al enviar los datos.' });
    }
  };

  return (
    <div className='container mt-4 bg-info p-3 bg-info bg-opacity-10 border-start-5 rounded-end rounded-start'>
      <h1 className='bg-info p-3 bg-info bg-opacity-10 border-start-5 rounded-end rounded-start'>Formulario de Empleado</h1>
      <label> Nombre:</label>
      <input type="text" className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <br />
      <label>Categoria:</label>
            <select className='form-control' value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                <option value="">Seleccionar categoria</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
      <br />
      <label>Horas Trabajadas:</label>
      <input type="number" className='form-control'
        value={horasTrabajadas}
        onChange={(e) => setHorasTrabajadas(parseInt(e.target.value, 10) || 0)} />
      <br />
      <button onClick={handleCalcularPago} className='btn btn-info'>Calcular Pago</button>
      <br />
      <label>Pago:</label>
      <input className='form-control' type="text" value={pago} readOnly />
      <br />
      <button onClick={handleEnviarDatos} className='btn btn-success'>Enviar Datos</button>
      {respuesta && (
        alert("Los datos fueron enviados correctamente!")
      )}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>
              CODIGO
            </th>
            <th>
              NOMBRE
            </th>
            <th>
              CATEGORIA
            </th>
            <th>
              HORAS TRABAJADAS
            </th>
            <th>PAGO TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {listaEmpleadosFiltrado.map((empleado) => (
            <tr key={empleado.id}>
            <td className="table-info">{empleado.id}</td>
            <td className="table-info">{empleado.nombre}</td>
            <td className="table-info">{empleado.categoria}</td>
            <td className="table-info">{empleado.horasTrabajadas}</td>
            <td className="table-info">{empleado.pago}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

