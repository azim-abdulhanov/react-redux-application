import { useSelector } from 'react-redux'
import { Input, Textarea } from '../../ui'

const ArticleForm = props => {
	const { isLoading } = useSelector(state => state.article)
	const {
		title,
		setTitle,
		description,
		setDescription,
		body,
		setBody,
		formSubmit,
	} = props

	return (
		<form onSubmit={formSubmit}>
			<Input label={'Title'} state={title} setState={setTitle} />
			<Textarea
				label={'Description'}
				state={description}
				setState={setDescription}
			/>
			<Textarea
				label={'Body'}
				state={body}
				setState={setBody}
				height={'250px'}
			/>
			<button type='submit' className='btn btn-primary btn-lg w-100' disabled={isLoading}>
				{isLoading ? 'Loading...' : 'Create'}
			</button>
		</form>
	)
}

export default ArticleForm
