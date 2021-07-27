import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Tabla = (props) => {
  const ponerFila = () =>
    props.usuarios.map((usuario, index) => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
        <td>
          <Link to={`/publicaciones/${index}`}>
            <div className="eye-solid icon"></div>
          </Link>
        </td>
      </tr>
    ))

  return (
    <div>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlance</th>
          </tr>
        </thead>
        <tbody>{ponerFila()}</tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps)(Tabla)
