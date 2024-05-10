import React, { useEffect, useState } from "react";
import { RestApiCategory } from "../util";
import axios from 'axios';
export default function ListaCategorias() {

    // Consultado 
    const [registroCompl, setRegistroCompl] = useState(false);
    const [mensajeEliminacion, setMensajeEliminacion] = useState('');
    const [ListaCategorias, setListaCategorias] = useState([])
    const [formData, setFormData] = useState({
        name: '',  
        descripcion: '',
        status: ''
      });

    useEffect(() => {
        leerApiCat()
    }, [])

    const leerApiCat = async () => {
        const rutaApiCat = RestApiCategory + "getAll"
        const responses = await fetch(rutaApiCat);
        const categoria = await responses.json();
        setListaCategorias(categoria);
    }

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleCategoriaChange = (e) => {
    // Obtén el id de la categoría seleccionada y actualiza el estado
    const categoriaId = e.target.value;
    setFormData({
      ...formData,
      categoria: categoriaId,
    });
    };

    // Funcionalidad de register categoria
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.descripcion|| !formData.status) {
            alert("Completar los campos para el registro de categoria");
            return;
        }
        try {
            const DataToSend = {
               ...formData,
            };

            const response = await axios.post("http://localhost:8085/api/categories/store", DataToSend);
            console.log("Categoria creado", response.data);

            // Si el registro es exitoso mostramos un mensaje
            setRegistroCompl(true);


        
        } catch (error) {
          console.error('Error creando categoria:', error);

          if (error.response) {
            console.log('Detalles del error:', error.response.data);
          } else if (error.request) {
            console.log('Error en la solicitud:', error.request);
          } else {
            console.log('Error general:', error.message);
          }
        }
    }
    // Funcion que elimina una categoria
    const handleDelete = async (id) => {
        try {
          // Lógica para eliminar un producto por ID
          await axios.delete(`http://localhost:8085/api/categories/delete/${id}`);
          // Recargar la lista de productos después de eliminar
          const response = await axios.get("http://localhost:8085/api/categories/getAll");
          setProductos(response.data);

          setMensajeEliminacion('Producto eliminado correctamente');

        } catch (error) {
          console.error("Error al eliminar la categoria:", error);
        }
      };

    return (
        // Muestra de tabla | Lista de categorias
        <div className="container px-4 px-lg-5">
             <div class="card text-white bg-secondary my-5 py-4 text-center">
                <div class="card-body"><p class="text-white m-0">Lista de Categorias</p></div>
            </div>
            {mensajeEliminacion && (
              <div className="mensaje-eliminacion">
              <p>{mensajeEliminacion}</p>
             </div>
            )}
            {registroCompl && <p className="text-info">¡Se ha registrado la categoria!</p>}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Agregar Categoria
        </button>

        <table className="table">
        <thead>
          
          <tr>
            <th>
              CODIGO
            </th>
            <th>
              NOMBRE
            </th>
            <th>
              DESCRIPCION
            </th>
            <th>
               STATUS
            </th>
            <th>
                ACCIONES
            </th>
          </tr>
        </thead>
        <tbody>
            {ListaCategorias
            .map((categoria) => (
                <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>{categoria.name}</td>
                    <td>{categoria.descripcion}</td>
                    <td>{categoria.status}</td>
                    <td>
                       <button className="btn btn-success mb-2">Actualizar</button>
                       <br></br>
                       <button onClick={() => handleDelete(categoria.id)} className="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            ))}
        
        </tbody>
      </table>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Agregar Nueva Categoria</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="formulario">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={handleChange}
                    name="name"
                    value={formData.name}
                    placeholder="Ingresar nombre del producto"
                  />
                  <label htmlFor="escripcion" className="form-label">Descripción producto</label>
                  <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    onChange={handleChange}
                    value={formData.descripcion}
                    placeholder="Ingresar descripción del producto"
                  />
                  <label htmlFor="status" className="form-label">Status</label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    onChange={handleChange}
                    name="status"
                    value={formData.status}
                    placeholder="Ingresar status"
                  />
                </div>
                <button type="text" className="btn btn-primary">Guardar Categoria</button>
              </form>
            </div>
          </div>
        </div>
      </div>
     </div>
    )
}