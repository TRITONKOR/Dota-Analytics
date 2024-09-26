import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import MatchesHistory from '../pages/MatchesHistory/MatchesHistory';
import NotFound from '../pages/NotFound/NotFound';

const AppRouter = () => {
    return (
        <Router>
            <header>
                <h1 className="h1-title">Dota Stratz API Example</h1>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/player" element={<MatchesHistory />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
