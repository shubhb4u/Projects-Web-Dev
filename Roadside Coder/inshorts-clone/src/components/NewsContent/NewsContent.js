import { Container } from '@mui/system'
import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsContent.css';

const NewsContent = ({loadMore, newsArray, newsResults, setLoadMore}) => {
  return (
    <Container maxWidth="md">
      <div className="content">
        <div className="downloadMessage">
          <span className="downloadText">For the best experience use <em>inshorts</em> app on your smartphone</span>
          <img src="https://assets.inshorts.com/website_assets/images/appstore.png"
           alt="play store"
           height="80%"/>
          <img src="https://assets.inshorts.com/website_assets/images/playstore.png"
           alt="app store"
           height="80%"/>
        </div>

        {
          newsArray.map((newsItem) => (

            <NewsCard newsItem={newsItem} key={newsItem.title}/>
          ))
        }

        {loadMore<=newsResults && (

          <>
            <button className="loadMore"
            onClick={()=>setLoadMore(loadMore+20)}
            >
              Load more
            </button>

          </>

        )}
        
      </div>

    </Container>
  )
}

export default NewsContent