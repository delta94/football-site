import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import Image from './Image';
import Loader from './Loader';
import defaultArticleImage from '../../public/images/Default_Article_Image.jpg';

class NewsTile extends React.Component {
	onClickNews = (index) => {
		const { articles } = this.props;
		const article = articles[index];
		const win = window.open(article.url, '_blank');
		win.focus();
	}

	render() {
		const { articles } = this.props;

		return (
			articles.length > 0 ?
				<div className='carousel-wrapper'>
					<Carousel
						width='34rem'
						useKeyboardArrows
						infiniteLoop
						autoPlay
						interval={5000}
						transitionTime={600}
						showIndicators={false}
						showThumbs={false}
						showStatus={false}
						onClickItem={this.onClickNews}>
						{
							articles.map((article) => (
								<div className='tile-imageitem' key={article.publishedAt}>
									<Image alt='news' src={article.urlToImage} defaultImage={defaultArticleImage} />
									<p className='tile-text'>{article.title}</p>
								</div>
							))
						}
					</Carousel>
				</div>
				:
				<Loader />
		);
	}
}

const getArticlesThatAreNotHeadlines = (news, headlines) => {
	const { currentIndex } = news.meta;
	if (currentIndex === -1) {
		return []
	};
	const articles = news.models[currentIndex];
	const headlineUrls = headlines.map((headline) => headline.url);

	return articles.filter((article) => !headlineUrls.includes(article.url));
}

NewsTile.propTypes = {
	articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
	articles: getArticlesThatAreNotHeadlines(state.news, state.news.headlines),
})

export default connect(
	mapStateToProps,
	undefined
)(NewsTile);
