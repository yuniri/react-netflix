import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Nav.css";

const Nav = () => {
    const [show, setshow] = useState(false);
    const [serchValue, setSerchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 50) {
                setshow(true);
            } else {
                setshow(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", () => {})
        }
    })

    const handleChanage = (e) => {
        setSerchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };
    
  return (
    <nav className={`nav ${show && 'nav_black'}`}>
        <img
            alt='Netflix log'
            src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
            className='nav_logo'
            onClick={()=>navigate('/')}
        />
        <input className='nav__input'
                value={serchValue} 
                onChange={handleChanage}
                placeholder='영화를 검색 해 주세요'
                type='text'
        />
        <img
            alt='Netflix avata'
            src='https://ap-northeast-2-02880055-view.menlosecurity.com/c/0/i/aHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy8wLzBiL05ldGZsaXgtYXZhdGFyLnBuZw~~'
            className='nav_avatar'
        />
    </nav>
  )
}

export default Nav
