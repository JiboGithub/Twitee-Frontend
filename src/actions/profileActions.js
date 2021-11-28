import axios from 'axios'
import {
	GET_PROFILE,
	LOAD_PROFILE,
	GET_POSTS,
	LOADING_POSTS
} from '../constants'


export const getUserProfile = (userId) => dispatch => {
	dispatch(loadProfile())
	axios.get(`https://twiteebackend.herokuapp.com/api/users/${userId}`)
		.then(res => dispatch({
			type: GET_PROFILE,
			payload: res.data
		}))
		.catch(err => console.log(err))
}

export const refreshUserProfile = (userId) => dispatch => {
	axios.get(`https://twiteebackend.herokuapp.com/api/users/${userId}`)
		.then(res => dispatch({
			type: GET_PROFILE,
			payload: res.data
		}))
		.catch(err => console.log(err))
}

export const getPostsByUserId = (userId) => dispatch => {
	dispatch(loadPosts())
	axios.get(`https://twiteebackend.herokuapp.com/api/posts/${userId}`)
		.then(res => dispatch({
			type: GET_POSTS,
			payload: res.data
		}))
		.catch(err => console.log(err))
}


export const searchUser = (searchData, history) => dispatch => {
	axios.post('https://twiteebackend.herokuapp.com/api/users/search', searchData)
		.then(res => {
			history.push(`/profile/${res.data.userId}`)
		})
		.catch(err => history.push('/search'))
}

export const loadProfile = () => {
	return {
		type: LOAD_PROFILE
	}
}

export const loadPosts = () => {
	return {
		type: LOADING_POSTS
	}
}