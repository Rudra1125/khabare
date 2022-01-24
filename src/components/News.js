import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>  {
  const [articles, setArticles] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [page, setpage] = useState(1); 
  const [totalResults, setTotalResults] = useState(0); 
  
  const captalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
//  

  
    

  const  updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    // console.log(parsedData);
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `Khabare-${captalizeFirstLetter(props.category)}`;
    updateNews()
  
  }, []);
  

  const handlePrevClick = async () => {
    console.log("prev");

    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=569d40835d1841eaacdf3495f5fee7b9&page=${.page-1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    // let data =await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //     page:this..page-1,
    //     articles:parsedData.articles,
    //     loading: false
    // })
    setpage(page-1)
    updateNews();
  };
  const handleNextClick = async () => {
    console.log("next");
    // if(!(this..page+1>Math.ceil(this..totalResults/props.pageSize))){

    //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=569d40835d1841eaacdf3495f5fee7b9&page=${this..page+1}&pageSize=${props.pageSize}`;
    //     this.setState({loading:true})
    //     let data =await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //         page:this..page+1,
    //         articles:parsedData.articles,
    //         loading: false
    //     })

    // }
    setpage(page+1)
    updateNews();
  }
  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
   
  }


 
    
    return (
      <>
        <h1 style={{ margin: "35px 0px" ,marginTop:'90px'}} className="text-center">
          Khabare-Top Headlines On{" "}
          {captalizeFirstLetter(props.category)}
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!=totalResults}
          loader={<h4>{<Spinner/>}</h4>}
        >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this..page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this..page + 1 >
              Math.ceil(this..totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div> */}
      </>
    );
  
}

export default News;

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  }
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  } 