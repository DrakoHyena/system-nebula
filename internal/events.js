import { DATA } from "/data/settings.js"
import { Planet } from "/internal/classes.js"

async function newPlanetAvailable(){
  if(DATA.availablePlanet !== undefined){
    console.log("Planet already available, not making new one")
    return;
  };
  DATA.availablePlanet = new Planet()
}

export {
  newPlanetAvailable

}