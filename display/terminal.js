import { SETTINGS, USER_SETTINGS } from "/data/settings.js"
import { hideLoading } from "/display/loading.js"
import { loadAudios, playAudio } from "/data/audio.js"
import { supportMessage } from "/data/ai.js"
import { processInput, startGame } from "/internal/game.js"
import { newPlanetAvailable } from "/internal/events.js"

const terminalEnter = document.getElementById("terminalEnter")
const terminalInput = document.getElementById("terminalInput")
const terminalContent = document.getElementById("terminalContent")

function wait(ms) {
  lockInput(true)
  return new Promise(resolve => setTimeout(()=>{
    lockInput(false)
    resolve()
  }, ms));
}

const clearTerminal = async function(rate=50){
  lockInput(true)
  return new Promise((res,rej)=>{
    let interval = setInterval(()=>{
      terminalContent.innerHTML = terminalContent.innerHTML.slice(0, terminalContent.innerHTML.length*(.5*Math.random()+.5)|0)
      playAudio("TypewriterClick")
      if(terminalContent.innerHTML.length === 0){
        clearInterval(interval);
        lockInput(false)
        res()
      }
    }, rate)
  })
}

const displayMessage = function(msg){
  msg = msg.replaceAll("\n", "<br>")
  terminalContent.innerHTML += msg
  terminalContent.innerHTML += "<br>"
}

const typeMessage = (() => {
  const queue = [];
  let typing = false;
  async function processQueue() {
    if (typing || queue.length === 0) return;
    typing = true;
    const [msg, rate, variance, resolve] = queue.shift();
    let index = 0;
    const type = () => {
      return new Promise(res => {
        const addChar = () => {
          let char = msg[index++];
          if (char === "\n") char = "<br>";
          terminalContent.innerHTML += char;
          if(100/rate < 70*Math.random()){
            playAudio("TypewriterClick")
          }
          if (index < msg.length) {
            setTimeout(addChar, rate + (variance * Math.random()));
          } else {
            terminalContent.innerHTML += "<br>";
            res();
          }
        };
        addChar();
        terminalContent.scrollTop = terminalContent.scrollHeight
      });
    };

    await type();
    typing = false;
    lockInput(false)
    resolve();
    processQueue();
  }

  return function (msg, rate = 2, variance = 15) {
    lockInput(true)
    return new Promise(resolve => {
      queue.push([msg, rate, variance, resolve]);
      processQueue();
    });
  };
})();

let inputLocked = false
function lockInput(bool){
  inputLocked = bool
}

async function sendInput(){
  if(inputLocked === true) return;
  if(terminalInput.value === "") return;
  processInput(terminalInput.value)
  terminalInput.value = "";
}
terminalInput.onkeydown = function(e){
  if(terminalInput.value !== "" && e.key === "Backspace"){
    playAudio("CreamyBackspace")
  }
}
terminalInput.onkeyup = function(e){
  if(e.key === "Enter"){
    playAudio("CreamyBackspace")
    sendInput()
  }
  if(e.key === "Space"){
    playAudio("CreamySpace")
  }
  if(e.key.length > 1) return;
  playAudio("CreamyClick")
}
terminalEnter.onclick = sendInput

async function intro(){
  if(USER_SETTINGS.skipIntro === false){
    await typeMessage("Starting system...")
    await wait(500)
    await typeMessage(`Using profile "User"...`)
    await typeMessage(`Using saved password: ${"*".repeat(4+(16*Math.random()|0))}`)
    await typeMessage(`New login "User" at ${(12*Math.random()|0)+1}/${(30*Math.random()|0)+1}/1986 ${(new Date()).toLocaleTimeString()}`)
    await typeMessage(`Loading display...`)
    await typeMessage(`Launching: Nebula32-v${SETTINGS.version}.exe`)
    await wait(1000)
  }
}

void (async()=>{
  await loadAudios()
  await hideLoading()
  await intro()
  await supportMessage()
  startGame()
  
  newPlanetAvailable()
})();

export {typeMessage, displayMessage, clearTerminal, lockInput, wait}