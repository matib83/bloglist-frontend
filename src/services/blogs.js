import axios from 'axios'
const baseUrl = '/api/blogs'

// Segun entiendo, cada vez que llame a este modulo, la variable token contiene las credenciales para
// realizar el create y el update de datos mediante el token
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log(request)
  return request.then(response => response.data)
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
  const request = await axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken }