import React, { useReducer } from 'react'
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types'
import axios from 'axios'
import { githubContext } from './githubContext'
import { githubReducer } from './githubReducer'

const CLIENT_ID = 'f259b124278494476d0f'
const CLIENT_SECRET = '0a9d790fbd5fe99940f0d853258b15c42d0f5068'

const withCreds = (url) => {
	return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

export const GithubState = ({children}) => {

	const initialState = {
		user: {},
		users: [],
		loading: false,
		repos: []
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	const search = async value => {
		setLoading()

		const response = await axios.get(
			withCreds(`http://api.github.com/search/users?q=${value}&`)
			)

		dispatch({
			type: SEARCH_USERS,
			payload: response.data.items
		})
	}

	const getUser = async name => {
		setLoading()

		const response = await axios.get(
			withCreds(`http://api.github.com/users/${name}?`)
			)

		dispatch({
			type: GET_USER,
			payload: response.data
		})
	}

	const getRepos = async name => {
		setLoading()
		const response = await axios.get(
			withCreds(`http://api.github.com/users/${name}/repos?per_page5&`)
			)

		dispatch({
			type: GET_REPOS,
			payload: response.data
		})
	}

	const setLoading = () => dispatch({type: SET_LOADING})

	const clearUsers = () => dispatch({type: CLEAR_USERS})

	const {user, users, loading, repos} = state

	return (
		<githubContext.Provider value={{
			search, getRepos, getUser, setLoading, clearUsers,
			user, users, loading, repos
		}}>
			{children}
		</githubContext.Provider>
	)
}