import React from 'react';

const NewsItem = (props) => {

    let { title, desc, imageUrl, newsUrl, author, date, sourceName } = props;
    return <div className='my-3'>
        <div className="card" >
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
                style={{ left: "80%", zIndex: "1" }}>
                {sourceName}
            </span>
            <img src={!imageUrl ? "https://www.bollyinside.com/wp-content/uploads/2021/12/Elon-Musk-rejects-mounting-criticism-that-his-satellites-are-obstructing.png" : imageUrl} className="card-img-top" alt="img of news" />
            <div className="card-body">
                <h5 className="card-title">{title} </h5>
                <p className="card-text"><small className="text-muted"> By {author ? author : "unknown author"} on {new Date(date).toGMTString()}
                </small></p>
                <p className="card-text">{desc}...</p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-info">For Detail Click Here</a>
            </div>
        </div>
    </div>;
}

export default NewsItem;
