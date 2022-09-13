import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}> {source ? source : "Unknown"}
                    </span>

                    <img src={!imageUrl ? "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2022/09/asteroid-1662981783.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} ...</h5>
                        <p className="card-text">{description} ...</p>
                        <p className='card-text'> <small className='text-muted'>By {author ? author : "Unknown"} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" className="btn btn-dark" target="_blank">Read more</a>
                    </div>
                </div>
            </div >
        )
    }
}

export default NewsItem