import React from "react";
import { useNavigate } from 'react-router-dom';
import './home.scss';

const Home = () => {

    const navigate = useNavigate();

    const goToMatchesHistory = () => {
        navigate('/player');
    };

    return (
        <div className="wrapper">
            <div className="buttons-wrapper">
                <button onClick={goToMatchesHistory} >Matches History</button>
                <button >Match Details</button>
            </div>
        </div>
    );
}

export default Home;
