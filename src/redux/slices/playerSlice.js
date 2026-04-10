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
      if (action.payload < 0) {
        state.volume = 0
      } else if (action.payload > 100) {
        state.volume = 100
      } else {
        state.volume = action.payload
      }
    },
  },
});

export const { playPause, setTime, changeVolume } = playerSlice.actions;
export default playerSlice.reducer;