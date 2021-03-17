import request from './common/request'

// detail
export const getDetail = (data) => {
  return request({
    url: '/detail',
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

// record
export const addRecord = (data) => {
  return request({
    url: '/addRecord',
    data,
    method: 'POST'
  })
}

export const getComments = (data) => {
  return request({
    url: '/getComments',
    data,
    method: 'GET'
  })
}

// likeComment
export const likeOrUnlikeComment = (data) => {
  return request({
    url: '/likeOrUnlikeComment',
    data,
    method: 'PUT'
  })
}
