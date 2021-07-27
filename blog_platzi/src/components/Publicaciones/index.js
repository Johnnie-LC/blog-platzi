import React from 'react'
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import Comentarios from './Comentarios'

const { traerTodos: usuariosTraerTodos } = usuariosActions
const {
  traerPorUsuario: publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios,
} = publicacionesActions

class Publicaciones extends React.Component {
  async componentDidMount() {
    const {
      usuariosTraerTodos,
      publicacionesTraerPorUsuario,
      match: {
        params: { index },
      },
    } = this.props
    if (!this.props.usuariosReducer.usuarios.length) {
      await usuariosTraerTodos()
    }
    if (this.props.usuariosReducer.error) {
      return
    }
    if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[index])) {
      await publicacionesTraerPorUsuario(index)
    }
  }

  ponerUsuario = () => {
    const {
      usuariosReducer,
      match: {
        params: { index },
      },
    } = this.props

    if (usuariosReducer.error) {
      return <Fatal error={usuariosReducer.error} />
    }

    if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
      return <Spinner />
    }

    const nombre = usuariosReducer.usuarios[index].name

    return <h1>Publicaciones de {nombre}</h1>
  }

  ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: {
        params: { index },
      },
    } = this.props

    if (!usuarios.length) return
    if (usuariosReducer.error) return
    if (publicacionesReducer.cargando) {
      return <Spinner />
    }
    if (publicacionesReducer.error) {
      return <Fatal error={publicacionesReducer.error} />
    }
    if (!publicaciones.length) return
    if (!('publicaciones_key' in usuarios[index])) return

    const { publicaciones_key } = usuarios[index]

    return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key)
  }

  mostrarInfo = (publicaciones, publicaciones_key) =>
    publicaciones?.map((publicacion, com_key) => (
      <div
        key={publicacion.id}
        className="pub_titulo"
        onClick={() =>
          this.mostrarComentarios(
            publicaciones_key,
            com_key,
            publicacion.comentarios
          )
        }
      >
        <h2>{publicacion.title}</h2>
        <h3>{publicacion.body}</h3>
        {publicacion.abierto ? (
          <Comentarios comentarios={publicacion.comentarios} />
        ) : (
          ' '
        )}
      </div>
    ))

  mostrarComentarios = (publicaciones_key, com_key, comentarios) => {
    this.props.abrirCerrar(publicaciones_key, com_key)
    if (!comentarios.length) {
      this.props.traerComentarios(publicaciones_key, com_key)
    }
  }

  render() {
    console.log('publicaciones:this.props: ', this.props)
    return (
      <React.Fragment>
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => ({
  usuariosReducer,
  publicacionesReducer,
})

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios,
}
export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)
