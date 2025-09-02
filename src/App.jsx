import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';
import { ScoreProvider } from './context/ScoreContext.jsx';
import ScoreDisplay from './components/ScoreDisplay.jsx';

function App() {
  return (
    <ScoreProvider>
      <div id="content">
        <h1>TIMER CHALLENGE</h1>
        <Player />
        <ScoreDisplay />
        <div id="challenges">
          <TimerChallenge title="Easy" targetTime={1} points={100} />
          <TimerChallenge title="Not easy" targetTime={5} points={250} />
          <TimerChallenge title="Getting Tough" targetTime={10} points={500} />
          <TimerChallenge title="Pro Player Only" targetTime={15} points={1000} />
        </div>
      </div>
    </ScoreProvider>
  );
}

export default App;