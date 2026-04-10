import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  playPause,
  setTime,
  changeVolume,
  toggleMute,
  nextRepeatMode,
  setPlaybackRate,
  seekForward,
  seekBackward,
} from './redux/slices/playerSlice';
import { Button, Slider, Select } from 'antd';
import {
  PlayCircleTwoTone,
  PauseCircleTwoTone,
  SoundTwoTone,
  RetweetOutlined,
  LeftCircleTwoTone,
  RightCircleTwoTone,
} from '@ant-design/icons';

const repeatLabels = {
  none: 'Repeat: Off',
  one: 'Repeat: One',
  all: 'Repeat: All',
};


function App() {
  const dispatch = useDispatch();
  const { isPlaying, maxTime, currentTime, volume, repeatMode, playbackRate } = useSelector(
    (state) => state.player,
  );

  return (
    <div style={{ maxWidth: '800px', textAlign: 'center' }}>
      <h1>Player</h1>
      <div style={{ display: 'flex', gap: '32px' }}>
        <div style={{ width: '100%' }}>
          <Slider
            min={0}
            max={maxTime}
            value={currentTime}
            onChange={(value) => dispatch(setTime(value))}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Button onClick={() => dispatch(nextRepeatMode())}>
          <RetweetOutlined />
          {repeatLabels[repeatMode]}
        </Button>
        <Button
          style={{ width: 64, height: 64, fontSize: 28 }}
          shape="circle"
          size="large"
          onClick={() => dispatch(seekBackward(10))}
          icon={<LeftCircleTwoTone />}
        />
        <Button
          style={{ width: 64, height: 64, fontSize: 28 }}
          shape="circle"
          size="large"
          onClick={() => dispatch(playPause())}
          icon={isPlaying ? <PauseCircleTwoTone /> : <PlayCircleTwoTone />}
        />
        <Button
          style={{ width: 64, height: 64, fontSize: 28 }}
          shape="circle"
          size="large"
          onClick={() => dispatch(seekForward(10))}
          icon={<RightCircleTwoTone />}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '24px' }} onClick={() => dispatch(toggleMute())}>
              <SoundTwoTone />
            </div>

            <div style={{ width: '150px' }}>
              <Slider
                min={0}
                max={100}
                value={volume}
                onChange={(value) => dispatch(changeVolume(value))}
              />
            </div>
          </div>
        </div>
        <div>
          <Select
            style={{ minWidth: '100px' }}
            value={playbackRate}
            onChange={(value) => dispatch(setPlaybackRate(value))}
            options={[
              { label: '0.5x', value: 0.5 },
              { label: '0.75x', value: 0.75 },
              { label: '1x', value: 1.0 },
              { label: '1.25x', value: 1.25 },
              { label: '1.5x', value: 1.5 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
