import request from './common/request'

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
