import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logo } from '../../constants'
import { logoutUser } from '../../slice/auth'
import { removeItem } from '../../helpers/persistance-storage'

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { isLoggedIn, user } = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const logoutHandler = () => {
		dispatch(logoutUser())
		removeItem('token')
		navigate('/login')
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<header>
			<nav className='navbar navbar-expand-lg bg-body-tertiary'>
				<div className='container-fluid container py-1'>
					<Link className='navbar-brand d-flex align-items-center gap-1' to={'/'}>
						<img src={logo} width={'45px'} height={'45px'} alt="" />
						<span className='fs-3 fw-bold text-primary'>Azim</span>
					</Link>
					<button 
						className='border-0 p-0 navbar-toggler' 
						type='button'
						onClick={toggleMenu}
					>	
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`}>
						<div className='d-flex gap-2'>
							{isLoggedIn ? (
								<div className='d-flex gap-2 align-items-center'>
									<Link className='btn btn-outline-primary' to={'/create-article'}>Create</Link>
									<button className='btn btn-outline-danger' onClick={logoutHandler}>
										Logout
									</button>
									<span className='fw-bold rounded-circle py-2 px-3 bg-primary text-white'>
										{user.username.slice(0, 1)}
									</span>
								</div>
							) : (
								<>
									<Link className='btn btn-outline-danger' to={'/login'}>Login</Link>
									<Link className='btn btn-outline-primary' to={'/register'}>Register</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
