const startButton = document.querySelector('#start')
const endButton = document.querySelector('#end')
const circles = document.querySelectorAll('.circle')
const overlay = document.querySelector('.overlay')
const closeButton = document.querySelector('#close')
const scoreSpan = document.querySelector('.score')
const scoreEnd = document.querySelector('.scoreEnd')
const endMessage = document.querySelector('#message')

// globals
let score = 0
let active = 0
let timer
let rounds = 0
let pace = 1000

// sounds
const clickSound = new Audio('click.wav')
clickSound.volume = 0.1
const endSound = new Audio('game_end.wav')
endSound.volume = 0.1
const startSound = new Audio('shuffle_sound.wav')
startSound.volume = 0.3

// game
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

circles.forEach((circle, i) => {
  circle.addEventListener('click', () => clickCircle(i))
})

const enableCircles = () => {
  circles.forEach(circle => {
    circle.style.pointerEvents = 'auto'
  })
}

const clickCircle = (i) => {
  if (i !== active) {
    return endGame()
  }
  score += 1
  rounds -= 1
  scoreSpan.textContent = score
  clickSound.play()
}

const startGame = () => {
  if (rounds >= 3) { // 3 missed rounds -> endgame
    return endGame()
  }

  startButton.classList.add('hidden')
  endButton.classList.remove('hidden')

  enableCircles()
  const nextActive = pickNew(active) // getting a new number in

  circles[nextActive].classList.toggle('active')
  circles[active].classList.remove('active')

  active = nextActive
  rounds++

  timer = setTimeout(startGame, pace)
  pace -= 10

  function pickNew (active) {
    const nextActive = getRandomNumber(0, 3)
    if (nextActive !== active) {
      return nextActive
    }
    return pickNew(active) // else run it again
  }
}

const endGame = () => {
  overlay.style.visibility = 'visible'
  clearTimeout(timer)
  if (score <= 8) {
    endMessage.textContent = 'Did you take an arrow in the knee?'
  } else if (score <= 20) {
    endMessage.textContent = 'Quite good!'
  } else {
    endMessage.textContent = 'GG! You could climb a mountain!'
  }
  scoreEnd.textContent = score
  endSound.play()
  endButton.classList.add('hidden')
  startButton.classList.remove('hidden')
}

const resetGame = () => {
  window.location.reload() // reloading resets game
}

const startGameSound = () => {
  startSound.play()
}

closeButton.addEventListener('click', resetGame)
startButton.addEventListener('click', startGame)
startButton.addEventListener('click', startGameSound)
endButton.addEventListener('click', endGame)
