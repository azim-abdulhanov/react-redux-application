import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleService from '../../service/article'
import {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailure,
} from '../../slice/article'
import { Loader } from '../../ui'
import ArticleCard from '../article-card/article-card'

const Main = () => {
	const { articles, isLoading } = useSelector(state => state.article)
	const dispatch = useDispatch()

	const getArticles = async () => {
		dispatch(getArticlesStart())
		try {
			const response = await ArticleService.getArticles()
			dispatch(getArticlesSuccess(response.articles))
		} catch (error) {
			dispatch(getArticlesFailure(error.response.data.errors))
		}
	}	

	useEffect(() => {
		getArticles()
	}, [])

	return (
		<main>
			{isLoading && <Loader />}
			<div className='album py-5'>
				<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
					{articles.map(article => (
						<ArticleCard article={article} getArticles={getArticles} />
					))}
				</div>
			</div>
		</main>
	)
}

export default Main
