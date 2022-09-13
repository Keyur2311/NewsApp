import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general",

    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
    }

    async componentDidMount() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42368fae79854c49a8df34d16447ea21&page=1&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        let response = await fetch(url);
        let data = await response.json();
        this.props.setProgress(70);
        this.setState(
            {
                articles: data.articles,
                totalResults: data.totalResults,
                loading: false,
            }
        );
        this.props.setProgress(100);
    }

    handlePrevClick = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42368fae79854c49a8df34d16447ea21&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        this.setState({ loading: true });
        let response = await fetch(url);
        let data = await response.json();
        this.props.setProgress(70);
        this.setState({
            page: this.state.page - 1,
            articles: data.articles,
            loading: false
        })
        this.props.setProgress(100);
    }

    handleNextClick = async () => {
        let totalPages = (Math.ceil((this.state.totalResults / this.props.pageSize)));
        let currentPage = this.state.page + 1;
        if (currentPage <= totalPages) {
            this.props.setProgress(10);
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=42368fae79854c49a8df34d16447ea21&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.props.setProgress(30);
            this.setState({ loading: true });
            let response = await fetch(url);
            let data = await response.json();
            this.props.setProgress(70);

            this.setState({
                page: this.state.page + 1,
                articles: data.articles,
                loading: false
            })
            this.props.setProgress(100);
        }

    }
    render() {
        return (
            <div className="container my-3">

                <h2 className='text-center my-3'>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
                        return <div className="col col-md-4 my-2" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prevoious</button>
                    <button disabled={this.state.page + 1 > (Math.ceil((this.state.totalResults / this.props.pageSize)))}
                        type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div >
        )
    }
};

export default News