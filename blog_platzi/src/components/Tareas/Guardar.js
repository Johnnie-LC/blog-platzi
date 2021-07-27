import React from 'react'
import { connect } from 'react-redux'
import * as tareasActions from '../../actions/tareasActions'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import { Redirect } from 'react-router-dom'

class Guardar extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { usu_id, tar_id },
      },
      tareas,
      cambiosUsuarioId,
      cambioTitulo,
      limpiarForma,
    } = this.props

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id]
      cambiosUsuarioId(tarea.userId)
      cambioTitulo(tarea.title)
    } else {
      limpiarForma()
    }
  }

  cambiosUsuarioId = (e) => {
    // console.log(e.target.value)
    this.props.cambiosUsuarioId(e.target.value)
  }
  cambioTitulo = (e) => {
    this.props.cambioTitulo(e.target.value)
  }
  guardar = () => {
    const {
      match: {
        params: { usu_id, tar_id },
      },
      tareas,
      usuario_id,
      titulo,
      agregar,
      editar,
    } = this.props

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    }

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id]
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id,
      }
      editar(tarea_editada)
    } else {
      console.log('Guardar', nueva_tarea)
      agregar(nueva_tarea)
    }
  }

  desabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props
    if (cargando) {
      return true
    }
    if (!usuario_id || !titulo) {
      return true
    }
    return false
  }
  mostrarAccion = () => {
    const { error, cargando } = this.props
    if (cargando) {
      return <Spinner />
    }
    if (error) {
      return <Fatal error={error} />
    }
  }

  render() {
    console.log('usuario_id: ', this.props.usuario_id)
    console.log('titulo: ', this.props.titulo)
    return (
      <div>
        {/* {this.props.regresar ? <Redirect to="/tareas" /> : ''} */}
        {this.props.regresar && <Redirect to="/tareas" />}
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambiosUsuarioId}
        />
        <br />
        <br />
        Titulo:
        <input
          type="text"
          value={this.props.titulo}
          onChange={this.cambioTitulo}
        />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.desabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    )
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer
export default connect(mapStateToProps, tareasActions)(Guardar)
