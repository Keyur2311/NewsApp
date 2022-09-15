import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
        <div className='my-3'>
            <div className="card">
                <div style={{
                    dispklay: 'flex',
                    justifyContent: 'flex-end',
                    right: '0',
                    position: 'absolute',
                }}>
                    <span className="badge rounded-pill bg-danger"> {source ? source : "Unknown"}
                    </span>
                </div>
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


export default NewsItem