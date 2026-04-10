import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { playPause, setTime, changeVolume } from './redux/slices/playerSlice';
import { Button, Slider } from 'antd';
import { PlayCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';

function App() {
  const dispatch = useDispatch();
  const { isPlaying, maxTime, currentTime, volume } = useSelector((state) => state.player);

  return (
    <div style={{ maxWidth: '600px', textAlign: 'center' }}>
      <h1>Player</h1>
      <div>
        <Slider
          min={0}
          max={maxTime}
          value={currentTime}
          onChange={(value) => dispatch(setTime(value))}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        <div style={{ width: '24px' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        </div>

        <div style={{width: '150px'}}>
          <Slider
            min={0}
            max={100}
            value={volume}
            onChange={(value) => dispatch(changeVolume(value))}
          />
        </div>

      </div>
      <div>
        <Button
          style={{ width: 64, height: 64, fontSize: 28 }}
          shape="circle"
          size="large"
          onClick={() => dispatch(playPause())}
          icon={isPlaying ? <PauseCircleTwoTone /> : <PlayCircleTwoTone />}
        />
      </div>
    </div>
  );
}

export default App;
