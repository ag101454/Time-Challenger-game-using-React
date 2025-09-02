import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export function useScore() {
    return useContext(ScoreContext);
}

export function ScoreProvider({ children }) {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const addScore = (points) => {
        setScore(prev => {
            const newScore = prev + points;
            if (newScore > highScore) {
                setHighScore(newScore);
            }
            return newScore;
        });
    };

    const resetScore = () => {
        setScore(0);
    };

    return (
        <ScoreContext.Provider value={{ score, highScore, addScore, resetScore }}>
            {children}
        </ScoreContext.Provider>
    );
}