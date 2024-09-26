import React, { useState } from "react";
import MatchList from '../../components/MatchList/MatchList';
import './matchesHistory.scss';

const MatchesHistory = () => {

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
            <div className="matches-history-wrapper">
                <div className="input-wrapper">
                    <input value={inputValue} onChange={handleInputChange} className="id-input" placeholder="Type account id" />
                    <button type="submit" onClick={handleSubmit} className="submit-button">&#x2192;</button>
                </div>
                {submittedValue && <MatchList steamAccountId={submittedValue} />}
            </div>
        </>
    );
}

export default MatchesHistory;
