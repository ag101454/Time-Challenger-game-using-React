import { useScore } from '../context/ScoreContext';

export default function ScoreDisplay() {
    const { score, highScore } = useScore();

    return (
        <div id="score-display">
            <div className="score-item">
                <span className="score-label">Current Score:</span>
                <span className="score-value">{score}</span>
            </div>
            <div className="score-item">
                <span className="score-label">High Score:</span>
                <span className="score-value">{highScore}</span>
            </div>
        </div>
    );
}