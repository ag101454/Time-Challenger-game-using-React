import { useState, useRef } from "react";

export default function Player() {
    const playerName = useRef();
    const [enteredPlayerName, setEnteredPlayerName] = useState(null);

    function handleClick() {
        setEnteredPlayerName(playerName.current.value);
        playerName.current.value = '';
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleClick();
        }
    }

    return (
        <section id="player">
            <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
            <p>
                <input
                    ref={playerName}
                    type="text"
                    placeholder="Enter your name"
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}