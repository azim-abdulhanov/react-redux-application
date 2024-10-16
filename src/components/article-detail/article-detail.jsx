import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ArticleService from '../../service/article'
import {
	getArticleDetailStart,
	getArticleDetailSuccess,
	getArticleDetailFailure,
} from '../../slice/article'
import moment from 'moment'
import { Loader } from '../../ui'

const ArticleDetail = () => {
	const { slug } = useParams()
	const dispatch = useDispatch()
	const { articleDetail, isLoading } = useSelector(state => state.article)

	useEffect(() => {
		const getArticleDetail = async () => {
			dispatch(getArticleDetailStart())
			try {
				const response = await ArticleService.getArticleDetail(slug)
				dispatch(getArticleDetailSuccess(response.article))
			} catch (error) {
				dispatch(getArticleDetailFailure())
			}
		}

		getArticleDetail()
	}, [slug])

	return isLoading ? ( 
		<Loader /> 
	) : (
		articleDetail !== null && (
			<div className='row py-5'>
				<div className='col-md-8'>
					<article className='blog-post'>
						<h2 className='fs-1 fw-bold mb-4'>{articleDetail.title}</h2>
						<p className='fs-5 text-muted'>{articleDetail.description}</p>
					
						<hr />
						<p className='fs-6'>{articleDetail.body}</p>
						<p className='text-end'>
							{moment(articleDetail.createdAt).format('DD MMMM, YYYY')}
						</p>
					</article>
				</div>

				<div className='col-md-4'>
					<div className='position-sticky'>
						<div className='p-4 mb- bg-body-tertiary rounded'>
							<h3 className='fs-4'>Author</h3>
							<p className='text-uppercase mb-0 fw-bold text-primary'>{articleDetail.author.username}</p>
							<p className='mt-4'>{articleDetail.author.bio}</p>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default ArticleDetail
