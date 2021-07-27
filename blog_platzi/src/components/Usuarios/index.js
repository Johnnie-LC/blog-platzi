import React, { Component } from 'react'
import { connect } from 'react-redux'
// with axios we can use all http methos post, set, get, write
import * as usuariosActions from '../../actions/usuariosActions'
import Spinner from '../../components/General/Spinner'
import Fatal from '../../components/General/Fatal'
import Tabla from './Tabla'

class Usuarios extends Component {
  componentDidMount() {
    if (!this.props.usuarios.length) {
      this.props.traerTodos()
    }
  }

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />
    }

    if (this.props.error) {
      return <Fatal error={this.props.error} />
    }

    return <Tabla />
  }

  render() {
    return (
      <React.Fragment>
        <h1>Usuarios</h1>
        {this.ponerContenido()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps, usuariosActions)(Usuarios)
