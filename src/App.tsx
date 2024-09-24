import React, { useState } from 'react';
import './App.scss';
import MatchList from './components/MatchList/MatchList';

const App = () => {

    const [inputValue, setInputValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState<number | null>(null);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    }

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (inputValue) {
            setSubmittedValue(Number(inputValue));
        }
    }
    return (
        <>
            <header>
                <h1 className="h1-title">Dota Stratz API Example</h1>
            </header>

            <div className="container">
                <div className="input-container">
                    <input value={inputValue} onChange={handleInputChange} className="id-input" placeholder="Type account id" />
                    <button type="submit" onClick={handleSubmit} className="submit-button">&#x2192;</button>
                </div>
                {submittedValue && <MatchList steamAccountId={submittedValue} />}
            </div>
        </>
    );
};

export default App
