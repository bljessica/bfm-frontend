import request from './common/request'

// detail
export const getDetailById = (data) => {
  return request({
    url: '/detailById',
    data,
    method: 'GET'
  })
}

// film
export const getAllFilms = (data) => {
  return request({
    url: '/allFilms',
    data,
    method: 'GET'
  })
}

// music
export const getAllMusics = (data) => {
  return request({
    url: '/allMusics',
    data,
    method: 'GET'
  })
}

// book
export const getAllBooksByType = (data) => {
  return request({
    url: '/allBooksByType',
    data,
    method: 'GET'
  })
}

// user
export const addUser = (data) => {
  return request({
    url: '/addUser',
    data,
    method: 'POST'
  })
}
