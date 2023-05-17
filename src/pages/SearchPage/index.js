import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './SearchPage.css';
import useDebounce from '../../hooks/useDebounce';

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState([]);
    
    const useQuery = () => {
        // console.log('useLocation()', useLocation());
        return new URLSearchParams(useLocation().search);
    }
    
    let query = useQuery();
    const searchTerm = query.get("q");
    const debounceSearchTerm = useDebounce(searchTerm, 500);

    console.log(debounceSearchTerm);
    
    useEffect(() => {
      if(debounceSearchTerm){
        fetchSearchMovie(debounceSearchTerm)
      }
    }, [debounceSearchTerm]
    );

    const fetchSearchMovie = async (debounceSearchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?includ_adult=false&query=${debounceSearchTerm}`
            )
            console.log(request);
            setSearchResult(request.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    const renderSearchResult = () => {
        return searchResult.length > 0 ? (
            <section className='search-container'>
                {searchResult.map(movie => {
                    if(movie.backdrop_path !== null && movie.mdeia_type !== 'person'){
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        const movieTitle = movie.title;
                        return (
                        <div className='movie' key={movie.id}>
                            <div onClick={() => navigate(`/${movie.id}`)} className='movie__column-poster'>
                                <img src={movieImageUrl} alt={movieTitle} className='movie__poster'/>
                            </div>
                        </div>
                        )
                    }
                })}
            </section>
        ) : (
            <section className='no-results'>
                <div className='no-results__text'>
                    <p>[{debounceSearchTerm}]nothing</p>
                </div>
            </section>
        )
    }

    return renderSearchResult();
}

export default SearchPage
