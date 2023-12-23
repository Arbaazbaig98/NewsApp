import React, { useState, useEffect } from 'react';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web'
import Home from './pages/Home'
import News from './components/News'
import Navbar from './components/Navbar';
// import Footer from './components/layout/Footer';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'; 
import './App.css'
import { BrowserRouter as Router,Routes,Route,} from "react-router-dom";

const alanKey ='252d1e3e3200c80ce3db1a533c4b22df2e956eca572e1d8b807a3e2338fdd0dc/stage'  

const App = () => {

  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)
  const loaderContainer = document.querySelector('.loader-container')

  useEffect(() => {
    if (loaderContainer){
      loaderContainer.classList.add('finish')
    }
    //Initialize Materialize JS
    M.AutoInit()
  },[loaderContainer])

  useEffect(() => {
    alanBtn({
        key: alanKey,
        onCommand: ({ command, articles, number }) => {
          if(command === 'newHeadlines'){
            setNewsArticles(articles)
            setActiveArticle(-1)
          } 
          else if (command === 'highlight'){
            setActiveArticle((prevActiveArticle) =>  prevActiveArticle + 1)
          } 
          else if (command === 'open'){
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number
            const article = articles[parsedNumber - 1]
            if (parsedNumber > 20) {
              alanBtn().playText('Please try that again...');
            } 
            else if (article) {
                window.open(article.url, '_blank');
                alanBtn().playText('Opening...');
            } 
            else {
                alanBtn().playText('Please try that again...');
            }
          }
        }, bottom: '30px', right:'100px'
    })
  }, [])


  const pageSize=6;
  const apiKey="7bdfb1b10aca41c6becea47611b7c35a"
  return (
    <div className="App">
    <Router>

        <Navbar />

        <Routes> 
        <Route exact path="/"  />
      <Route exact path="/Home" element={<News key="general" pageSize={pageSize} apiKey={apiKey}  country='in' category='general'/>} />
      <Route exact path="/sports" element={<News key="sports"  pageSize={pageSize} apiKey={apiKey} country='in' category='sports'/>} />
      <Route exact path="/business" element={<News key="business" pageSize={pageSize} apiKey={apiKey} country='in' category='business'/>} />
      <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} apiKey={apiKey} country='in' category='entertainment'/>} />
      <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} apiKey={apiKey} country='in' category='technology'/>} />
      <Route exact path="/general" element={<News key="general" pageSize={pageSize}  apiKey={apiKey} country='in' category='general'/>} />
      <Route exact path="/science" element={<News key="science" pageSize={pageSize} apiKey={apiKey} country='in' category='science'/>} />
      </Routes>


        <Home articles={newsArticles} activeArticle={activeArticle}/>
        {/* <Footer /> */}
    </Router>
    </div>
  );
}

export default App
