import { setLoadingText } from "/display/loading.js"
const cdnLink = `${window.location.protocol}//cdn.glitch.global/2d451fc1-cf2f-456e-b166-2b41e6b3f3bb/`

let audios = {
  Click: ["Click.wav?v=1740109818388", 0.1],
  KeyboardClick: ["KeyboardClick.wav?v=1740114421781", .2],
  CreamyClick: ["CreamyClick.mp3?v=1740114530718", .5],
  CreamyBackspace: ["CreamyBackspace.mp3?v=1740114826560", .5],
  CreamySpace: ["CreamySpace.mp3?v=1740114827367", .5],
  TypewriterClick: ["TypewriterClick.wav?v=1740115828677", .01],
  Switch: ["Switch.wav?v=1740118597552", .1]
}
let audiosLoaded = 0;

async function loadAudios(){
  setLoadingText(`Loading sounds... (${audiosLoaded}/${Object.keys(audios).length})`, audiosLoaded/audios.length)
  for(let audioArr of Object.values(audios)){
    await fetch(`${cdnLink}${audioArr[0]}`) // browser should cache them for when we need to play...
    audiosLoaded++
    setLoadingText(`Loading sounds... (${audiosLoaded}/${Object.keys(audios).length})`, audiosLoaded/audios.length)
  }
}

function playAudio(str, pitchVary=0){
  let audioArr = audios[str]
  if(audioArr === undefined){
    throw new Error(`Audio "${str}" could not be found`)
  }
  let audio = new Audio(`${cdnLink}${audioArr[0]}`)
  audio.playbackRate = 1-(Math.random() * pitchVary);
  audio.volume = audioArr[1]
  // try doesnt work for this for some reason...
  try{
    audio.play()
  }catch(err){
    // TODO: Maybe make a system to keep track of their "times" incase the browser doesnt do it already
    // I need to look into it...
    console.log("Audio not played because user didnt interact")
  }
  return audio
}

export { loadAudios, playAudio }