import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = originalToken => {
  token = `Bearer ${originalToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blogObject => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (blogObject, blog_id) => {

  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blog_id}`
  const response = await axios.put(url, blogObject, config)
  return response.data
}

const deleteBlog = async (blog_id) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blog_id}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { setToken, getAll, create, update, deleteBlog }