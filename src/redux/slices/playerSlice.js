import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false, // воспроизведение активно или нет
  currentTime: 0, // текущая позиция трека в секундах (0 .. maxTime)
  maxTime: 180, // максимальная длительность трека (3 минуты = 180 сек) — константа, не меняется
  volume: 50, // громкость от 0 до 100
  isMuted: false, // включён ли мут
  previousVolume: 50, // громкость до мута (нужно для восстановления)
  playbackRate: 1.0, // скорость воспроизведения
  repeatMode: 'none', // режим повтора: "none", "one", "all"
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setTime: (state, action) => {
      if (action.payload < 0) {
        state.currentTime = 0;
      } else if (action.payload > state.maxTime) {
        state.currentTime = state.maxTime;
      } else {
        state.currentTime = action.payload;
      }
    },
    changeVolume: (state, action) => {
      const newVolume = Math.min(Math.max(action.payload, 0), 100);

      if (newVolume === 0) {
        state.previousVolume = state.volume > 0 ? state.volume : state.previousVolume;
        state.volume = 0;
        state.isMuted = true;
      } else {
        state.volume = newVolume;
        state.isMuted = false;
      }
    },
    toggleMute: (state) => {
      if (!state.isMuted) {
        state.previousVolume = state.volume;
        state.volume = 0;
        state.isMuted = true;
      } else {
        state.volume = state.previousVolume;
        state.isMuted = false;
      }
    },
    nextRepeatMode: (state) => {
      switch (state.repeatMode) {
        case 'none':
          state.repeatMode = 'one';
          break;
        case 'one':
          state.repeatMode = 'all';
          break;
        case 'all':
          state.repeatMode = 'none';
          break;
      }
    },
    setPlaybackRate: (state, action) => {
      const allowed = [0.5, 0.75, 1.0, 1.25, 1.5];
      if (allowed.includes(action.payload)) {
        state.playbackRate = action.payload;
      }
    },
  },
});

export const { playPause, setTime, changeVolume, toggleMute, nextRepeatMode, setPlaybackRate } =
  playerSlice.actions;
export default playerSlice.reducer;