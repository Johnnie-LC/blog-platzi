/* eslint-disable import/no-anonymous-default-export */
import {
  ACTUALIZAR,
  CARGANDO,
  ERROR,
  COM_CARGANDO,
  COM_ERROR,
  COM_ACTUALIZAR,
} from '../types/publicacionesTypes'

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: '',
  com_cargando: false,
  com_error: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CARGANDO:
      return {
        ...state,
        cargando: true,
        error: '',
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
        cargando: false,
      }
    case ACTUALIZAR:
      return {
        ...state,
        publicaciones: action.payload,
        cargando: false,
      }
    case COM_ACTUALIZAR:
      return {
        ...state,
        publicaciones: action.payload,
        com_error: false,
        com_cargando: false,
      }
    case COM_CARGANDO:
      return {
        ...state,
        com_cargando: true,
      }
    case COM_ERROR:
      return {
        ...state,
        com_error: action.payload,
      }
    default:
      return state
  }
}
