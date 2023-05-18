import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import NavInshorts from './components/NavInshorts';
import NewsContent from './components/NewsContent/NewsContent';
import apikey from './data/config';
import Footer from './components/Footer/Footer';

function App() {

  const [category, setCategory] = useState("general");
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);

  const newsApi = async() => {

    try {

      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const news = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}&pageSize=${loadMore}&category=${category}`);
      console.log(news.data);
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);

    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    newsApi()
  }, [newsResults, category, loadMore]);

  console.log(newsArray);
  

  return (
    <div className="App">
      <NavInshorts setCategory={setCategory}/>
      <NewsContent loadMore={loadMore} setLoadMore={setLoadMore} newsArray={newsArray} newsResults={newsResults}/>
      <Footer/>
    </div>
  );
}

export default App;
