import axios from '../api/axios';
import React, { useState, useEffect, useCallback} from 'react'
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';

const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [hasVideo, setHasVideo] = useState(0)

    useEffect(() => {
        fetchData();
        console.log("useEffect");
    }, [])

    const fetchData = async () => {
        const request = await axios.get(requests.fetchNowPlaying);
        console.log(request);

        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
            params: {append_to_response : "videos"}
        });
        setMovie(movieDetail);
        
    }
    ;

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    };

    const showVideo = (mv) => {
        console.log("showVideo");
        console.log(movie);
        setHasVideo(mv.videos.results.length);
        if(hasVideo>0){
            setIsClicked(true);
        } else {
            //alert("비디오가 없습니다.")
        }
    }

    if (!isClicked) {
        return (
            <header
                className='banner'
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "top center"

                }}
            >
                <div className='banner__contents'>
                    <h1 className='banner__title'>{movie.title || movie.name || movie.original_title}</h1>

                    <div className='banner__buttons'>
                        {movie.video}<button className='banner__button play' onClick={()=> showVideo(movie)}>Play</button>
                        <button className='banner__button info'>More Information</button>
                    </div>
                    <h1 className='banner__description'>{truncate(movie?.overview, 100)}</h1>
                </div>
                <div className='banner--fadeBottom'></div>
            </header>
        )
    } else {
        return (
            <Container>
                <HomeContainer>
                <Iframe width="640" height="360" src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1`} 
                    allow="autoplay; fullscreen" />
                </HomeContainer>
                
            </Container>
        );
    }
}

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100vh;
`;

export default Banner
