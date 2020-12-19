startReactor = {

  computerCombination: [],
  playerCombination: [],
  computerCombinationPostition: 1,
  computerMaxPosition: 5,
  memoryMaxCombination: 9,

  audio: {
    start: 'start.mp3',
    fail: 'fail.mp3',
    complete: 'complete.mp3',
    combinations: [ '0.mp3', '1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '7.mp3', '8.mp3', '9.mp3'],

    loadAudio(filename) {

      const file = `./audio/${filename}?cb=${new Date.getTime()}`
      const audio = new Audio(file)
      audio.load()
      return audio

    },

    loadAudios() {

      if (typeof(startReactor.audio.start) == "object") return

      startReactor.audio.start = startReactor.audio.loadAudio(startReactor.audio.start)
      startReactor.audio.complete = startReactor.audio.loadAudio(startReactor.audio.complete)
      startReactor.audio.fail = startReactor.audio.loadAudio(startReactor.audio.fail)
      startReactor.audio.combinations = startReactor.audio.map((audio) => startReactor.audio.loadAudio(audio))
      
    }

  },
  interface: {
    memoryPanel: document.querySelector(".painelMemory"),
    computerLedPanel: document.querySelector(".computerLedPanel"),
    playerLedPanel: document.querySelector(".playerLedPanel"),
    playerMemory: document.querySelector(".painelMemory"),
    playerMemoryButtons: document.querySelector(".player_memory"),

    turnLedOn(index, LedPanel)  {
      LedPanel.children[index].classList.add("ledOn");
    },

    turnAllLedsOff() {
      const computerPanel = startReactor.interface.computerLedPanel
      const playerLedPanel = startReactor.interface.playerLedPanel

      for (var i = 0; i < this.computerLedPanel.children.length; i++) {
        computerLedPanel.children[i].classList.remove("ledOn");
        playerLedPanel.children[i].classList.remove("ledOn");

      }
    },

    async start() {
      return startReactor.audio.start.play()
    },
  },

  load() { },
  start() { 
    startReactor.computerCombination = startReactor.createCombination()
    startReactor.computerCombinationPostition = 1
    startReactor.playerCombination = []
    startReactor.interface.start().then(() => {
      setTimeout(() => {
        startReactor.playerCombination()
      })
    })
  },

  createCombination() {

    let newCombination = []
    for (let n = 0; n < startReactor.computerMaxPosition; n++) {
      const postition = Math.floor((Math.random * startReactor.memoryMaxCombination) + 1)
      newCombination.push(postition-1)
    }
    return newCombination

  },

  playerCombination() {

  }
}