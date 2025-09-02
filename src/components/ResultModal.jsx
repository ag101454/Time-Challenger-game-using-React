import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, result, points, onReset }, ref) {
    const dialog = useRef();
    const userLost = result === 'lose';
    const userWon = result === 'win';
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    // Calculate points based on remaining time (up to 50% bonus)
    const calculateEarnedPoints = () => {
        if (userLost) return 0;
        const timePercentage = (remainingTime / (targetTime * 1000));
        const bonusMultiplier = 1 + (timePercentage * 0.5);
        return Math.floor(points * bonusMultiplier);
    };

    const earnedPoints = calculateEarnedPoints();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current?.showModal();
            },
            close() {
                dialog.current?.close();
            }
        };
    });

    function handleClose() {
        dialog.current?.close();
        onReset();
    }

    return (
        <dialog ref={dialog} className="result-modal">
            {userLost && <h2>You Lost! ⏰</h2>}
            {userWon && <h2>You Win! 🎉</h2>}
            
            <p>
                The target time was <strong>{targetTime} second{targetTime !== 1 ? 's' : ''}</strong>
            </p>
            
            {userLost ? (
                <p>
                    Time ran out! You were too slow.
                </p>
            ) : userWon ? (
                <>
                    <p>
                        Congratulations! You stopped the timer with{' '}
                        <strong>{formattedRemainingTime} seconds remaining</strong>
                    </p>
                    <p className="points-earned">
                        🎯 Points earned: <strong>{earnedPoints}</strong>
                    </p>
                </>
            ) : null}
            
            <form method="dialog">
                <button type="button" onClick={handleClose}>
                    {userWon ? 'Play Again' : 'Try Again'}
                </button>
            </form>
        </dialog>
    );
});

export default ResultModal;