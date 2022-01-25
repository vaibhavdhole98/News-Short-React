import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const allInOne = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let res = await fetch(url);
        props.setProgress(40);
        let data = await res.json();
        props.setProgress(70);
        setArticles(data.articles);
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        allInOne();
        document.title = `${capitalizeFirstLetter(props.category)} -News Shorts`

    }, []);

    const previousClick = async () => {
        setPage(page - 1)
        allInOne();
    }
    const nextClick = async () => {
        setPage(page + 1)
        allInOne();
    }

    return (
        <div className='container my-2'>
            <h1 className='text-center' style={{ margin: "20px", color: "coral", fontFamily: "inherit", marginTop: "75px" }} >News Shorts - Top  {capitalizeFirstLetter(props.category)} Headlines </h1>
            {loading && <Spinner />}
            <div className="row">
                {!loading && articles.map((e) => {
                    return <div className="col-md-4" key={e.url}>
                        <NewsItem title={e.title ? e.title : ""} desc={e.description ? e.description.slice(0, 80) : ""} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author}
                            date={e.publishedAt} sourceName={e.source.name} />
                    </div>
                })}
            </div>
            <div className="container d-flex justify-content-between my-2">
                <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={previousClick}>&larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(props.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={nextClick}>Next &rarr;</button>
            </div>
        </div>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}

export default News;