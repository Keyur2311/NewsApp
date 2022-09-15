import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const News = (props) => {

    const [articles, setarticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        document.title = `${capitalize(props.category)} - NewsMoneky`;
        const updateData = async () => {
            props.setProgress(10);
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
            props.setProgress(30);
            let response = await fetch(url);
            let data = await response.json();
            props.setProgress(70);
            setarticles(data.articles);
            setTotalResults(data.totalResults);
            setLoading(false);
            props.setProgress(100);
        }
        updateData();

        // eslint-disable-next-line
    }, [])

    const handlePrevClick = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
        props.setProgress(30);
        setLoading(true);
        let response = await fetch(url);
        let data = await response.json();
        props.setProgress(70);
        setarticles(data.articles);
        setPage(page - 1);
        setLoading(false);
        props.setProgress(100);
    }

    const handleNextClick = async () => {
        let totalPages = (Math.ceil((totalResults / props.pageSize)));
        let currentPage = page + 1;
        if (currentPage <= totalPages) {
            props.setProgress(10);
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
            props.setProgress(30);
            setLoading(true);
            let response = await fetch(url);
            let data = await response.json();
            props.setProgress(70);
            setPage(page + 1);
            setarticles(data.articles);
            setLoading(false);
            props.setProgress(100);
        }

    }

    return (
        <div className="container my-3">

            <h2 className='text-center' style={{ margin: '0px', marginTop: '80px', marginBottom: '10px' }}>NewsMonkey - Top {capitalize(props.category)} Headlines</h2>
            {loading && <Spinner />}
            <div className="row">
                {!loading && articles && articles.map((element) => {
                    return <div className="col col-md-4 my-2" key={element.url}>
                        <NewsItem title={element.title ? element.title.slice(0, 70) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
                })}
            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Prevoious</button>
                <button disabled={page + 1 > (Math.ceil((totalResults / props.pageSize)))}
                    type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div >
    )

};


News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",

}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}


export default News