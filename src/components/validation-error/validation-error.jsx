import { useCallback } from 'react'
import { useSelector } from 'react-redux'

const ValidationError = () => {
	const { error } = useSelector(state => state.auth)

	const errorMessage = useCallback(() => {
		return Object.keys(error).map(name => {
			const message = error[name].join(', ')
			return `${name} - ${message}`
		})
	}, [error])

	return (
		error !== null && errorMessage().map(error => (
			<div key={error} class='alert alert-danger p-2' role='alert'>
				{error}
			</div>
		))
	)
}

export default ValidationError
