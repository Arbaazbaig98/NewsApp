import React  from 'react'

const NewsItem=(props)=> {
    
    let {title,description,imgUrl,newsUrl,author,date,source} =props
    return (
      <div>
        <div className='card card2' style={{marginTop:'10px'}}>
        <span className="position-absolute top-0
         translate-middle badge rounded-pill bg-black" style={{left:'90%' , zIndex:'1'}}>{source}</span>
  <img src={!imgUrl?"https://149695847.v2.pressablecdn.com/wp-content/uploads/2019/06/chris-ried-512801-unsplash.jpg":imgUrl} className="card-img-top" alt="Unknown"/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {author?author:"Unknown Author1"} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank"  rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }


export default NewsItem