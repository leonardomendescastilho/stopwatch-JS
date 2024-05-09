class Stopwatch {
  #elapsedTimeInSeconds = 0;
  #intervalId = null;

  start(callback) {
    this.#intervalId = setInterval(() => {
      this.#elapsedTimeInSeconds++;
      callback(this.elapsedTime);
    }, 1000);
  }

  stop() {
    clearInterval(this.#intervalId);
  }
  reset(callback) {
    this.#elapsedTimeInSeconds = 0;
    callback(this.elapsedTime)
  }
  get elapsedTime() {
    return Stopwatch.formartTime(this.#elapsedTimeInSeconds);
  }

  static formartTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;
    return `${Stopwatch.zeroPadding(hours)}:${Stopwatch.zeroPadding(
      minutes
    )}:${Stopwatch.zeroPadding(seconds)}`;
  }
  static zeroPadding(originalNumber, desireAmountDigits = 2) {
    let stringNumber = String(originalNumber);
    const zeroesRequired = desireAmountDigits - stringNumber.length;

    if (zeroesRequired <= 0) {
      return stringNumber;
    }

    for (let counter = 0; counter < zeroesRequired; counter++) {
      stringNumber = `0${stringNumber}`;
    }
    return stringNumber;
  }
}

const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const resetBtn = document.getElementById('reset')
const stopwatchDisplay = document.getElementById('stopwatch-display')

function changeStopwatchDisplay (timeValue){
  stopwatchDisplay.innerHTML = timeValue;
}

let isRunning = false;
startBtn.addEventListener('click', ()=>{
  if(!isRunning);{
    sw1.start(changeStopwatchDisplay);
    isRunning = true;
    startBtn.disabled = true;
  }
})
stopBtn.addEventListener('click', ()=>{
  sw1.stop();
  isRunning = false;
  startBtn.disabled = false;
})
resetBtn.addEventListener('click', ()=>{
  sw1.stop();
  sw1.reset(changeStopwatchDisplay);
  isRunning = false;
  startBtn.disabled = false;
})


const sw1 = new Stopwatch();