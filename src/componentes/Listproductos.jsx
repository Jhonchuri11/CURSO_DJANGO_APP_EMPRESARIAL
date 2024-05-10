import React, { useEffect, useState } from "react";
import { RestApiCategory, RestApiProduct } from "../util";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Listproductos() {

    // Consultado 
    const navigate = useNavigate();
    const [listaProFiltrado, setLisProListadoFiltrado] = useState([])
    const [registroCompl, setRegistroCompl] = useState(false);
    const [ListaCategorias, setListaCategorias] = useState([])
    const [formData, setFormData] = useState({
        name: '',  
        descripcion: '',
        categoria: '',
        meausurement_id: '',
        currency_id: '',
        brand_id: '',
        detail: '',
        status: ''
      });

    useEffect(() => {
        leerApiPro()
        leerApiCat()
    }, [])

    const leerApiPro = async () => {
        const rutaApi = RestApiProduct + "all";
        const response = await fetch(rutaApi);
        const producto = await response.json();
        setLisProListadoFiltrado(producto);
    };

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
    // 
    const categoriaId = e.target.value;
    setFormData({
      ...formData,
      categoria: categoriaId,
    });
    };

    // Funcionalidad de register producto
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.descripcion || !formData.categoria || !formData.meausurement_id || !formData.currency_id || !formData.brand_id || !formData.detail || !formData.status) {
            alert("Completar los campos para el registro de producto");
            return;
        }
        try {
            const DataToSend = {
               ...formData,
               categoria: parseInt(formData.categoria),
            };

            const response = await axios.post("http://localhost:8085/api/products/store", DataToSend);
            console.log("Producto creado", response.data);

            // Si el registro es exitoso mostramos un mensaje
            setRegistroCompl(true);


        
        } catch (error) {
          console.error('Error creando producto:', error);

          if (error.response) {
            console.log('Detalles del error:', error.response.data);
          } else if (error.request) {
            console.log('Error en la solicitud:', error.request);
          } else {
            console.log('Error general:', error.message);
          }
        }
    }
    // Funcion que elimina un producto
    const handleDelete = async (id) => {
        try {
          // Lógica para eliminar un producto por ID
          await axios.delete(`http://localhost:8085/api/products/delete/${id}`);
          // Recargar la lista de productos después de eliminar
          const response = await axios.get("http://localhost:8085/api/products/all");
          setProductos(response.data);
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
        }
      };

    return (
        <div className="container px-4 px-lg-5">
             <div class="card text-white bg-secondary my-5 py-4 text-center">
                <div class="card-body"><p class="text-white m-0">Lista de Productos</p></div>
            </div>
            {registroCompl && <p className="text-info">¡Se ha registrado el producto!</p>}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Agregar Producto
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
              CATEGORIA
            </th>
            <th>
               meausurement_id
            </th>
            <th>
               currency_id
            </th>
            <th>
               brand_id
            </th>
            <th>
               detail
            </th>
            <th>
               status
            </th>
            <th>
                ACCIONES
            </th>
          </tr>
        </thead>
        <tbody>
            {listaProFiltrado
            .map((producto) => (
                <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.name}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.id}</td>
                    <td>{producto.meausurement_id}</td>
                    <td>{producto.currency_id}</td>
                    <td>{producto.brand_id}</td>
                    <td>{producto.detail}</td>
                    <td>{producto.status}</td>
                    <td>
                       <button className="btn btn-success mb-2">Actualizar</button>
                       <br></br>
                       <button onClick={() => handleDelete(producto.id)} className="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            ))}
        
        </tbody>
      </table>
      {/* Modal para agregar nuevo producto */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Agregar Nuevo Producto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Formulario para el nuevo producto */}
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
                  <label className="form-label">Seleccionar la categoria</label>
                  <select className="form-control" name="categoria" value={formData.categoria.id} onChange={handleCategoriaChange}>
                    <option>Categorias</option>
                    {ListaCategorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.name}
                        </option>
                    ))}
                  </select>
                  <label htmlFor="meausurement_id" className="form-label">Meausurement_id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="meausurement_id"
                    onChange={handleChange}
                    name="meausurement_id"
                    value={formData.meausurement_id}
                    placeholder="Ingresar meausurement_id"
                  />
                  <label htmlFor="currency_id" className="form-label">Currency_id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="currency_id"
                    onChange={handleChange}
                    name="currency_id"
                    value={formData.currency_id}
                    placeholder="Ingresar currency_id"
                  />
                  <label htmlFor="brand_id" className="form-label">Brand_id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="brand_id"
                    name="brand_id"
                    onChange={handleChange}
                    value={formData.brand_id}
                    placeholder="Ingresar brand_id"
                  />
                  <label htmlFor="detail" className="form-label">Detail</label>
                  <input
                    type="text"
                    className="form-control"
                    id="detail"
                    onChange={handleChange}
                    name="detail"
                    value={formData.detail}
                    placeholder="Ingresar detail"
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
                {/* Otros campos del formulario */}
                <button type="text" className="btn btn-primary">Guardar Producto</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    )
}