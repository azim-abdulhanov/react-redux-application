import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUserStart, signUserSuccess, signUserFailure } from '../../slice/auth'
import { logo } from '../../constants'
import AuthService from '../../service/auth'
import { Input } from '../../ui'
import { ValidationError } from '../'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const { isLoading, isLoggedIn } = useSelector(state => state.auth)

	const navigate = useNavigate()

	const loginHandler = async e => {
		e.preventDefault()
		dispatch(signUserStart())

		const user = { email,	password }

		try {
			const response = await AuthService.userLogin(user)
			dispatch(signUserSuccess(response.user))
			navigate('/')
		} catch (error) {
			dispatch(signUserFailure(error.response.data.errors))
		}
	}

	useEffect(() => {
		if (isLoggedIn) {	
			navigate('/')
		}
	}, [isLoggedIn])

	return (
		<div className='container'>
			<div style={{ maxWidth: '400px', width: '100%' }} className='mx-auto bg-light py-5 px-4 rounded my-5'>
				<form>
					<img 
						src={logo} 
						width={'50px'} 
						height={'50px'} 
						alt="" 
						className='d-block mx-auto mb-2'
					/>
					<h1 className='h2 mb-3 fw-normal text-center'>Please login</h1>
					<ValidationError />
					<Input 
						type={'email'} 
						label={'Email'} 
						state={email} setState={setEmail} 
					/>
					<Input 
						type={'password'} 
						label={'Password'} 
						state={password} 
						setState={setPassword} 
					/>
					<button 
						type='submit'
						className='btn btn-primary btn-lg mt-2 w-100 py-2'
						onClick={loginHandler}	
						disabled={isLoading}
					>
						{isLoading ? 'Loading...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login