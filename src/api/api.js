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

export const getFilmTagAnalysis = (data) => {
  return request({
    url: '/filmTagAnalysis',
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

export const getUserInfo = (data) => {
  return request({
    url: '/userInfo',
    data,
    method: 'GET'
  })
}

export const updateUser = (data) => {
  return request({
    url: '/updateUser',
    data,
    method: 'PUT'
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

export const getItemComments = (data) => {
  return request({
    url: '/itemComments',
    data,
    method: 'GET'
  })
}

export const getUserComments = (data) => {
  return request({
    url: '/userComments',
    data,
    method: 'GET'
  })
}

export const editComment = (data) => {
  return request({
    url: '/editComment',
    data,
    method: 'PUT'
  })
}

export const deleteComment = (data) => {
  return request({
    url: '/deleteComment',
    data,
    method: 'DELETE'
  })
}

export const getUserAnalysis = (data) => {
  return request({
    url: '/userAnalysis',
    data,
    method: 'GET'
  })
}

export const getUserAnalysisDetail = (data) => {
  return request({
    url: '/userAnalysisDetail',
    data,
    method: 'GET'
  })
}

export const getUserAnalysisSectionItems = (data) => {
  return request({
    url: '/userAnalysisSectionItems',
    data,
    method: 'GET'
  })
}

export const getDoneItemsAnalysis = (data) => {
  return request({
    url: '/doneItemsAnalysis',
    data,
    method: 'GET'
  })
}

export const getTimeLineData = (data) => {
  return request({
    url: '/timeLineData',
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

// search
export const search = (data) => {
  return request({
    url: '/search',
    data,
    method: 'POST'
  })
}
