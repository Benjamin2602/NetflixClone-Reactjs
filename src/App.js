import React from 'react';
import './App.css';
import Row from './component/Row';
import requests from './requests';
import Banner from './component/Banner';
import Nav from './component/Nav';

function App() {
  return (
    <div className="app">
    <Nav/>
    <Banner />
    
      {/* fetch basically means the url we are going to pull from requests.js */}
      <Row 
      title="BENFLIX ORGINALS" 
      fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow = {true}
      />
      <Row title="TRENDING NOW" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
      <Row title="Action Movies" fetchUrl={requests.fetchTopActionMovies}/>
      <Row title="Comedy Movies" fetchUrl={requests.fetchTopComedyMovies}/>
      <Row title="Horror Movies" fetchUrl={requests.fetchTopHorrorMovies}/>
      <Row title="Romance Movies" fetchUrl={requests.fetchTopRomanceMovies}/>
      <Row title="Documentaries" fetchUrl={requests.fetchTopDocumentaries}/>

    </div>
  );
}

export default App;
