const Input = ({ label, state, setState, type = 'text' }) => {
	return (
		<div className='form-floating mb-2'>
			<input
				type={type}
				className='form-control'
				placeholder={label}
				value={state}
				onChange={e => setState(e.target.value)}
				id='floatingInput'
			/>
			<label htmlFor='floatingInput'>{label}</label>
		</div>
	)
}

export default Input
