import { useRef, useState, useEffect } from "react"
import ResultModal from "./ResultModal";
import { useScore } from '../context/ScoreContext';

export default function TimerChallenge ({title , targetTime, points}) {
    const timer = useRef();
    const dialog = useRef();
    const { addScore } = useScore();

    const [timeRemaining , setTimeRemaining] = useState(targetTime * 1000);
    const [timerIsActive, setTimerIsActive] = useState(false);
    const [gameResult, setGameResult] = useState(null);

    const timerExpired = timeRemaining <= 0;
    const formattedTime = (timeRemaining / 1000).toFixed(2);

    useEffect(() => {
        if (timeRemaining <= 0 && timerIsActive) {
            clearInterval(timer.current);
            setGameResult('lose');
            dialog.current?.open();
            setTimerIsActive(false);
        }
    }, [timeRemaining, timerIsActive]);

    useEffect(() => {
        return () => clearInterval(timer.current);
    }, []);

    function calculatePoints(remainingTime) {
        const timePercentage = (remainingTime / (targetTime * 1000));
        const basePoints = points;
        const bonusMultiplier = 1 + (timePercentage * 0.5); // Up to 50% bonus
        return Math.floor(basePoints * bonusMultiplier);
    }

    function handleReset () {
        setTimeRemaining(targetTime * 1000);
        setTimerIsActive(false);
        setGameResult(null);
    }

    function handleStart () {
      setTimerIsActive(true);
      setGameResult(null);
      timer.current = setInterval(() => {
        setTimeRemaining(prevTimeRemaining => {
          if (prevTimeRemaining <= 10) {
            clearInterval(timer.current);
            return 0;
          }
          return prevTimeRemaining - 10;
        });
      }, 10);
    }

    function handleStop () {
        clearInterval(timer.current);
        setTimerIsActive(false);
        
        if (timeRemaining > 0) {
            const earnedPoints = calculatePoints(timeRemaining);
            addScore(earnedPoints);
            setGameResult('win');
        } else {
            setGameResult('lose');
        }
        
        dialog.current?.open();
    }

    return (
        <>
          <ResultModal 
            ref={dialog} 
            targetTime={targetTime} 
            remainingTime={timeRemaining} 
            result={gameResult}
            points={points}
            onReset={handleReset} 
          />
          <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-points">Points: {points}</p>
            <p className="challenge-time" >
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                  {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
               {timerIsActive ? `Time remaining: ${formattedTime}s` : 'Timer inactive'}
            </p>
            {timerIsActive && (
                <progress 
                    value={targetTime * 1000 - timeRemaining} 
                    max={targetTime * 1000} 
                />
            )}
          </section>
        </>
    )
}