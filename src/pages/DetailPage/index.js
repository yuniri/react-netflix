import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

const DetailPage = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});
  // console.log(movieId);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${movieId}`
      )
      console.log('request', request);
      setMovie(request.data);
    }
    fetchData();
  }, [movieId])
  
  if(!movie.backdrop_path) return <section>... loading</section>

  return <section>
          <img 
          className='modal__poster-img'
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt='poster'
          />
        </section>
}

export default DetailPage
