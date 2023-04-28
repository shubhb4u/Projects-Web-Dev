import './App.css';
import Header from './Header';
import RecommendedVideos from './RecommendedVideos';
import SideBar from './SideBar';
import './Sidebar.css';
import './RecommendedVideos.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="app">

    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/> } />
        <Route path="users/*" element={<SideBar/>} />
      </Routes>
    </BrowserRouter> */}


      <Router>
        <Switch>
          <Route path="/search">
            element = {<Header/>} 
            <h1>Search Page</h1> 
          </Route>
          <Route path="/">
            <Header/>
            <div className="app__page">
            <SideBar/>
            <RecommendedVideos/> 
           </div>
          </Route> 
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
