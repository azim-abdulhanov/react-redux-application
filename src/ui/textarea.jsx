const Textarea = ({ label, state, setState, height = '100px' }) => {
	return (
		<div className='form-floating mb-2'>
			<textarea
				className='form-control'
				placeholder={label}
				id='floatingTextarea'
				value={state}
				onChange={e => setState(e.target.value)}
				style={{height: height}}
			></textarea>
			<label htmlFor='floatingTextarea'>{label}</label>
		</div>
	)
}

export default Textarea
