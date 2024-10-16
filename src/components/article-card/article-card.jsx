import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ArticleService from '../../service/article'

const ArticleCard = ({ article, getArticles }) => {
	const navigate = useNavigate()
	const { isLoggedIn, user } = useSelector(state => state.auth)

	const deleteArticle = async slug => {
		try {
			await ArticleService.deleteArticle(slug)
			getArticles()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='col' key={article.id}>
			<div className='card h-100 shadow-sm'>
				<svg
					className='bd-placeholder-img card-img-top'
					width='100%'
					height='225'
					xmlns='http://www.w3.org/2000/svg'
					role='img'
					aria-label='Placeholder: Thumbnail'
					preserveAspectRatio='xMidYMid slice'
					focusable='false'
				>
					<rect width='100%' height='100%' fill='#55595c'></rect>
				</svg>
				<div className='card-body'>
					<h3 className='card-text fw-bold fs-5'>{article.title}</h3>
					<p className='card-text'>{article.description}</p>
				</div>
				<div className='card-footer d-flex justify-content-between align-items-center'>
					<div className='btn-group'>
						<button
							type='button'
							className='btn btn-sm btn-outline-secondary'
							onClick={() => navigate(`/article/${article.slug}`)}
						>
							View
						</button>
						{isLoggedIn && user.username === article.author.username && (
							<>
								<button
									type='button'
									className='btn btn-sm btn-outline-primary'
									onClick={() => navigate(`/edit-article/${article.slug}`)}
								>
									Edit
								</button>
								<button
									type='button'
									className='btn btn-sm btn-outline-danger'
									onClick={() => deleteArticle(article.slug)}
								>
									Delete
								</button>
							</>
						)}
					</div>
					<span className='text-muted text-capitalize fw-bold'>
						{article.author.username}
					</span>
				</div>
			</div>
		</div>
	)
}

export default ArticleCard
