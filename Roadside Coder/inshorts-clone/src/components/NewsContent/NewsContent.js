import { Container } from '@mui/system'
import React from 'react';
import './NewsContent.css';

const NewsContent = () => {
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
        
      </div>
    </Container>
  )
}

export default NewsContent