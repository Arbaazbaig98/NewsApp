import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=>{
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)
  
  
  
  const updateNews=async ()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)} - NewsApp`;
    updateNews();

  },[])
 

 const fetchMoreData =async () => {
 
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
   setTotalResults(parsedData.totalResults)
  };

 
    return (
      <>
        <h1 className="text-center-h"
         style={{margin:'35px',marginTop:'90px',color:props.mode}}>Top Headlines on {capitalizeFirstLetter(props.category)}</h1><br/>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className="container">
                 <div className="row">
            {articles.map((art) => {
            return (
              <div className="col-md-4" key={art.url}>
                <NewsItem
                  title={art.title}
                  description={art ? art.description : ""}
                  imgUrl={art.urlToImage}
                  newsUrl={art.url}
                  author={art.author}
                  date={art.publishedAt}
                  source={art.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>

              </InfiniteScroll>
        <br/>
        
      </>
    );
  }



News.defaultProps = {
  country:'in',
  pageSize:5,
  category:'general',

}

News.propTypes = {
  country:PropTypes.string,
  name:PropTypes.number,
  category:PropTypes.string,
}

export default News;
