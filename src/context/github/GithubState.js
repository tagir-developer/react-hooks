import React, { useReducer } from 'react'
import { githubContext } from './githubContext'
import { githubReducer } from './githubReducer'

export const GithubState = ({children}) => {

	const initialState = {
		user: {},
		users: [],
		loading: false,
		repos: []
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	return (
		<githubContext.Provider value={{

		}}>
			{children}
		</githubContext.Provider>
	)
}