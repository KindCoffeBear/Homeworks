// Создание Action Creators для состояния постов
import {
  ADD_NEW_POST, DELETE_POST, GET_CURRENT_POST, GET_POSTS_FROM_SERVER, UPDATE_POST,
} from '../actionTypes/postsTypes'

const getPostsFromServer = (postsFromServer) => ({
  type: GET_POSTS_FROM_SERVER,
  payload: postsFromServer,
})

// получение всех постов с сервера
export const getPostsFromServerQuery = (filter = '') => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/api/v1/posts/?${filter}`)
  const dataFromServer = await response.json()
  dispatch(getPostsFromServer(dataFromServer))
}

const addNewPost = (newPost) => ({
  type: ADD_NEW_POST,
  payload: newPost,
})

// добавление поста на сервере и получение данных с сервера
export const addNewPostQuery = (newPost) => async (dispatch) => {
  const response = await fetch('http://localhost:3000/api/v1/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  })

  if (response.status === 201) {
    const newPostFromServer = await response.json()
    dispatch(addNewPost(newPostFromServer))
  } else {
    alert('Введите все данные')
  }
}

const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
})

// удаление поста по id
export const deletePostQuery = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
    method: 'DELETE',
  })

  if (response.status === 200) {
    dispatch(deletePost(id))
  }
}

const updatePost = (newPhoneObject) => ({
  type: UPDATE_POST,
  payload: newPhoneObject,
})

// обновление поста на сервере и получение данных с сервера
export const updatePostQuery = (id, formData, closeModal) => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (response.status === 200) {
    const updatedPostFromServer = await response.json()
    dispatch(updatePost(updatedPostFromServer))
    closeModal()
  } else {
    alert('Введите все данные')
  }
}

const getPost = (postFromServer) => ({
  type: GET_CURRENT_POST,
  payload: postFromServer,
})

// получение конкретного поста по id и передача setLoading (изменение состояния загрузки страницы) и controller для отмены загрузки страницы
export const getPostQuery = (id, setLoading, controller) => async (dispatch) => {
  const response = await fetch(`http://localhost:3000/api/v1/posts/${id}`, { signal: controller.current.signal }) // { signal: controller.current.signal } определяет идет запрос или он отменен
  const postFromServer = await response.json()
  dispatch(getPost(postFromServer))
  setLoading(false)
}
