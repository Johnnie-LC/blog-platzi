import axios from 'axios'
import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMB_USUARIO_ID,
  CAMB_TITULO,
  GUARDAR,
  ACTUALIZAR,
  LIMPIAR,
} from '../types/tareasTypes'

export const traerTodas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  })

  try {
    const respuesta = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    )

    const tareas = {}
    respuesta.data.map(
      (tar) =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar,
          },
        })
    )

    dispatch({
      type: TRAER_TODAS,
      payload: tareas,
    })
  } catch (error) {
    console.log('Error: ', error.message)
    dispatch({
      type: ERROR,
      payload: 'Informacion de tareas no disponible.',
    })
  }
}

export const cambiosUsuarioId = (usario_id) => (dispatch) => {
  dispatch({
    type: CAMB_USUARIO_ID,
    payload: usario_id,
  })
}
export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMB_TITULO,
    payload: titulo,
  })
}
export const agregar = (nueva_Tarea) => async (dispatch) => {
  console.log('Nueva Tarea: ', nueva_Tarea)
  dispatch({
    type: CARGANDO,
  })
  try {
    const respuesta = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      nueva_Tarea
    )
    console.log('agregar: ', respuesta.data)
    dispatch({
      type: GUARDAR,
    })
  } catch (error) {
    console.log(error.message)
    dispatch({
      type: ERROR,
      payload: 'no se envió nadita',
    })
  }
}

export const editar = (tarea_editada) => async (dispatch) => {
  console.log('Tarea editada: ', tarea_editada)
  dispatch({
    type: CARGANDO,
  })

  try {
    const respuesta = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
      tarea_editada
    )
    console.log('Editar: ', respuesta.data)
    dispatch({
      type: GUARDAR,
    })
  } catch (error) {
    console.log(error.message)
    dispatch({
      type: ERROR,
      payload: 'Intente mas tarde',
    })
  }
}
export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer
  const seleccionada = tareas[usu_id][tar_id]

  // el spread operator solo funcionan en el primer nivel de un objeto por
  // lo que hay que seguir usando en otros niveles
  const actualizadas = {
    ...tareas,
  }
  actualizadas[usu_id] = {
    ...tareas[usu_id],
  }
  actualizadas[usu_id][tar_id] = {
    ...tareas[usu_id][tar_id],
    completed: !seleccionada.completed,
  }
  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas,
  })
}
export const eliminar = (tar_id) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  })
  try {
    const respuesta = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${tar_id}`
    )
    console.log('Eliminar: ', respuesta)
    dispatch({
      type: TRAER_TODAS,
      payload: {},
    })
  } catch (error) {
    console.log(error.message)
    dispatch({
      type: ERROR,
      payload: 'Intente mas tarde',
    })
  }
}

export const limpiarForma = () => (dispatch) => {
  console.log('Limpiar forma')
  dispatch({
    type: LIMPIAR,
    payload: '',
  })
}
