import axios from 'axios'
import { TRAER_TODOS, URL_API, CARGANDO, ERROR } from '../types/usuariosTypes'

export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  })

  try {
    const respuesta = await axios.get(URL_API)
    dispatch({
      type: TRAER_TODOS,
      payload: respuesta.data,
    })
  } catch (error) {
    console.log('Error: ', error.message)
    dispatch({
      type: ERROR,
      payload: 'Informacion de usuario no disponible.',
    })
  }
}
