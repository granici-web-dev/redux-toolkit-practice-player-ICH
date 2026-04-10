const initialState = {
isPlaying: false, // воспроизведение активно или нет
currentTime: 0, // текущая позиция трека в секундах (0 .. maxTime)
maxTime: 180, // максимальная длительность трека (3 минуты = 180 сек) — константа, не меняется
volume: 50, // громкость от 0 до 100
isMuted: false, // включён ли мут
previousVolume: 50, // громкость до мута (нужно для восстановления)
playbackRate: 1.0, // скорость воспроизведения
repeatMode: "none" // режим повтора: "none", "one", "all"
};

Задачи:
Работу с булевыми флагами (isPlaying, isMuted)
Работу с числами и ограничениями (volume, currentTime)
Переключение состояний (циклическое, с запоминанием)
Логику «запомнить и восстановить» (для mute)

maxTime — это константа, она не должна меняться через экшены. Но редьюсеры должны использовать её для ограничения currentTime.

playPause
переключает isPlaying на противоположное значение.
Было: isPlaying: false → Стало: isPlaying: true
Было: isPlaying: true → Стало: isPlaying: false

setTime - устанавливает currentTime на указанное значение.
payload — число (секунды).
Ограничения:
Если payload < 0 → установить 0.
Если payload > maxTime → установить maxTime.
Пример:
setTime(45) → currentTime = 45
setTime(-10) → currentTime = 0
setTime(999) → currentTime = 180

changeVolume
Что делает: изменяет громкость.
Параметры: payload — новое значение громкости (число от 0 до 100).
Ограничения:
Если payload < 0 → установить 0.
Если payload > 100 → установить 100.
\*\*Дополнительная логика: если новая громкость стала 0 → автоматически включить isMuted = true (и сохранить previousVolume равным этой громкости? Нет, previousVolume должен хранить последнюю НЕНУЛЕВУЮ громкость перед мутом — смотри следующий экшен).
Если новая громкость > 0 и isMuted === true → автоматически выключить мут (isMuted = false).
Пример:
Было: volume = 50, isMuted = false → changeVolume(0) → volume = 0, isMuted = true
Было: volume = 0, isMuted = true → changeVolume(30) → volume = 30, isMuted = false

toggleMute
Что делает: включает или выключает режим "мут" с запоминанием громкости.
Параметры: нет.
Логика:
Если isMuted === false (включаем мут):
Запомнить текущую громкость в previousVolume
Установить volume = 0
Установить isMuted = true
Если isMuted === true (выключаем мут):
Восстановить громкость из previousVolume
Установить isMuted = false
Важно: previousVolume не должен быть 0 (если пользователь включил мут при громкости 0, то previousVolume должен сохранить последнюю ненулевую громкость. Но для простоты пусть сохраняет текущую, даже если она 0).
Пример:
Было: volume = 70, isMuted = false → toggleMute() → previousVolume = 70, volume = 0, isMuted = true
Ещё раз toggleMute() → volume = 70, isMuted = false

nextRepeatMode
Что делает: циклически переключает repeatMode в порядке:
"none" → "one" → "all" → "none" → ...
Параметры: нет.
Пример:
Было: "none" → Стало: "one"
Было: "one" → Стало: "all"
Было: "all" → Стало: "none"

setPlaybackRate
Что делает: устанавливает скорость воспроизведения.
Параметры: payload — одно из допустимых значений: 0.5, 0.75, 1.0, 1.25, 1.5.
Ограничения: если переданное значение не входит в список разрешённых — не менять ничего.
Пример:
setPlaybackRate(1.25) → playbackRate = 1.25
setPlaybackRate(2.0) → ничего не меняется (остаётся старое значение)

\*\*seekForward и seekBackward
Что делают: перематывают вперёд/назад на заданное количество секунд
Параметры: payload — количество секунд (целое число).
Логика:
seekForward: currentTime = min(currentTime + seconds, maxTime)
seekBackward: currentTime = max(currentTime - seconds, 0)
Пример:
Было currentTime = 120, seekForward(30) → 150
Было currentTime = 170, seekForward(30) → 180
Было currentTime = 10, seekBackward(15) → 0
