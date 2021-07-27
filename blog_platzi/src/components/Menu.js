import React from 'react'
import { Link } from 'react-router-dom'
const Menu = (props) => (
  <nav id="Menu">
    <Link to="/">Usuarios</Link>
    <Link to="/tareas">Tareas</Link>
  </nav>
)
export default Menu
