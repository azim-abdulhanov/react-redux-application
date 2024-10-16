import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import ArticleForm from '../article-form/article-form'
import ArticleService from '../../service/article'
import {
	getArticleDetailStart,
	getArticleDetailSuccess,
	getArticleDetailFailure,
	postArticleStart,
	postArticleSuccess,
	postArticleFailure,
} from '../../slice/article'

const EditArticle = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [body, setBody] = useState('')
	const { slug } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		const getArticleDetail = async () => {
			dispatch(getArticleDetailStart())
			try {
				const response = await ArticleService.getArticleDetail(slug)
				setTitle(response.article.title)
				setDescription(response.article.description)
				setBody(response.article.body)
				dispatch(getArticleDetailSuccess(response.article))
			} catch (error) {
				dispatch(getArticleDetailFailure())
			}
		}

		getArticleDetail()
	}, [slug])

	const formSubmit = async e => {
		e.preventDefault()
		const article = { title, description, body }

		dispatch(postArticleStart())
		try {
			await ArticleService.editArticle(slug, article)
			dispatch(postArticleSuccess())
			navigate('/')
		} catch (error) {
			dispatch(postArticleFailure())
		}
	}
	
	const formProps = {
		title,
		setTitle,
		description,
		setDescription,
		body,
		setBody,
		formSubmit,
	}

	return (
		<div className='text-center py-5'>
			<h1 className='mb-4'>Edit article</h1>
			<div className='w-50 d-block mx-auto'>
				<ArticleForm {...formProps} />
			</div>
		</div>
	)
}

export default EditArticle
