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

  const newsApi = async() => {

    try {
      const news = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}&category=${category}`);
      console.log(news.data);
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);

    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    newsApi()
  }, [newsResults, category]);

  console.log(newsArray);
  

  return (
    <div className="App">
      <NavInshorts setCategory={setCategory}/>
      <NewsContent/>
      <Footer/>
    </div>
  );
}

export default App;
