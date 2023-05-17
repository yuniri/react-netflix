import React, { useState } from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import "./App.css";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
/*
API 키 (v3 auth)
735c0fc8d72b27975ed9b3f1db4ec231
API 요청 예
https://api.themoviedb.org/3/movie/550?api_key=735c0fc8d72b27975ed9b3f1db4ec231
API 읽기 액세스 토큰 (v4 auth)
eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzVjMGZjOGQ3MmIyNzk3NWVkOWIzZjFkYjRlYzIzMSIsInN1YiI6IjY0NTI1ZTM3ZDhmNDRlMGRiMTllZmYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9MUZWKzzODtdGPGeTd2CzK-FVOMEoHatV6ps8N6A59I

*/

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  )
}

function App() {
  const [isLargeRow, setIsLargeRow] = useState(true);
  
  return (
    <div className="app">
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<MainPage />} />
            <Route path=":movieId" element={<DetailPage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
