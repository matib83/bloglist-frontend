import axios from 'axios'
const baseUrl = '/api/blogs'

// Cada vez que llame a este modulo, la variable token contiene las credenciales para
// realizar el create y el update de datos mediante el token
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  console.log(request)
  return request.data
}

const create = async newObject => {
  // Este config es de Axios, para poder mandar el token en el HEADER de la petición
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.data
}

const deleteBlog = async id => {
  // Este config es de Axios, para poder mandar el token en el HEADER de la petición
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.delete(`${ baseUrl }/${id}`, config)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, deleteBlog, setToken }