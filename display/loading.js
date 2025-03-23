import { USER_SETTINGS } from "/data/settings.js"
import { playAudio } from "/data/audio.js"
import { wait } from "/display/terminal.js"

const styles = getComputedStyle(document.documentElement)
const loadingScreen = document.getElementById("loadingScreen");
loadingScreen.style.display = "block";
const loadingText = document.getElementById("loadingText")
const onButton = document.getElementById("turnComputerOn")
onButton.style.opacity = 0;
onButton.style.display = "none";

function setLoadingText(text, percentage=0){
  loadingText.innerHTML = text;
  percentage = (90*percentage)
  loadingText.style.background = `linear-gradient(90deg, ${styles.getPropertyValue("--color")} ${percentage}%, ${styles.getPropertyValue("--background")} ${percentage+10}%)`
  return loadingText.style.background
}

let detectClicks = false;
let onReadyClick = new Promise((res, rej)=>{
  onButton.onclick = function(){
    if(detectClicks === false) return;
    res()
  }
})
async function hideLoading(){
  if(USER_SETTINGS.skipIntro === false){
    detectClicks = true;
    loadingText.remove()
    loadingScreen.style.display = "flex";
    onButton.style.display = "block"
    onButton.style.opacity = ".5"
    await onReadyClick
    playAudio("Switch")
    onButton.style.backgroundColor = styles.getPropertyValue("--color")
    await wait(750)
    onButton.remove()
    loadingScreen.style.background = "white"
    loadingScreen.style.opacity = "0";
  }
  setTimeout(()=>{loadingScreen.remove()}, 250)
}

export { setLoadingText, hideLoading }