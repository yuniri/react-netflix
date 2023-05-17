import React from 'react'
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";


const MainPage = () => {
  return (
    <div className="app">
    <Banner />

    <Row 
      title="Netflix Original"
      id="NO"
      fetchUrl={requests.fetchNetflixOrginals}
      isLargeRow
    />
    <Row 
      title="Trending Now"
      id="TN"
      fetchUrl={requests.fetchTrending}
    />
    <Row 
      title="Top Rated"
      id="TR"
      fetchUrl={requests.fetchTopRated}
    />
    <Row 
      title="Action Movies"
      id="AM"
      fetchUrl={requests.fetchActionMovies}
    />
  </div>
  )
}

export default MainPage
