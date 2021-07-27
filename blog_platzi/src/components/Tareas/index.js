import React from 'react'
import { connect } from 'react-redux'
import * as tareasActions from '../../actions/tareasActions'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import { Link } from 'react-router-dom'

class Tareas extends React.Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas()
    }
  }

  componentDidUpdate() {
    const { tareas, cargando, traerTodas } = this.props

    if (!Object.keys(tareas).length && !cargando) {
      traerTodas()
    }
  }

  ponerContenido = () => {
    const { tareas, cargando, error } = this.props
    if (cargando) {
      return <Spinner />
    }
    if (error) {
      return <Fatal error={error} />
    }

    // Now we have a object, before we had a array's object, so we are going to use a Object.keys

    return Object.keys(tareas).map((usu_id, index) => (
      <div key={index}>
        <h2>Usuario {usu_id}</h2>
        <div className="contenedor_tareas">{this.ponerTareas(usu_id)}</div>
      </div>
    ))
  }

  ponerTareas = (usu_id) => {
    const { tareas, cambioCheck, eliminar } = this.props
    const por_usuario = {
      ...tareas[usu_id],
    }
    return Object.keys(por_usuario).map((tar_id, index) => (
      <div key={index}>
        <input
          type="checkbox"
          defaultChecked={por_usuario[tar_id].completed}
          onChange={() => cambioCheck(usu_id, tar_id)}
        />
        {por_usuario[tar_id].title}
        <Link to={`/tareas/guardar/${usu_id}/${tar_id}`}>
          <button className="m_left">Editar</button>
        </Link>
        <button className="m_left" onClick={() => eliminar(tar_id)}>
          Eliminar
        </button>
      </div>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <h1>Tareas</h1>
        <Link to="/tareas/guardar">
          <button>
            {/* <Link to="/tareas/guardar">Agregar</Link> */}
            Agregar
          </button>
        </Link>
        {this.ponerContenido()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas)
