import { SETTINGS, USER_SETTINGS, DATA } from "/data/settings.js"
import { typeMessage, displayMessage, clearTerminal, lockInput, wait } from "/display/terminal.js"
import { playAudio } from "/data/audio.js"
import { Planet } from "/internal/classes.js"

const menuStack = [];
menuStack.addMenu = async function(name, display, options){
  menuStack.push({
    name,
    display: async (prev)=>{
      await clearTerminal()
      await typeMessage(menuStack.toString(), 0)
      await typeMessage(" ")
      await display(prev)
    },
    options,
  })
  await menuStack.top().display()
}
menuStack.top = function(){
  return menuStack[menuStack.length-1]
}
menuStack.prev = async function(prev){
  await clearTerminal()
  menuStack.pop()
  await menuStack.top().display(prev)
}
menuStack.toString = function(){
  let str = "["
  for(let i = 0; i < menuStack.length; i++){
    str += menuStack[i].name
    if(i !== menuStack.length-1){
      str += ">"
    }else{
      str += "]"
    }
  }
  return str
}

const optionStack = [];
optionStack.addOption = function(optionObj){
  optionStack.push(optionObj)
}
optionStack.top = function(){
  return optionStack[optionStack.length-1]
}
optionStack.prev = function(){
  optionStack.pop()
}

async function prev(){
  await menuStack.prev(true)
  optionStack.prev(true)
}


function startGame(){
  menuStack.addMenu(
    `Nebula v${SETTINGS.version}`,    
    async ()=>{
      await displayMessage(`<pre>
 ______   ______ _____ _____ __  __   _   _ _____ ____  _   _ _        _    
/ ___\\ \\ / / ___|_   _| ____|  \\/  | | \\ | | ____| __ )| | | | |      / \\   
\\___ \\\\ V /\\___ \\ | | |  _| | |\\/| | |  \\| |  _| |  _ \\| | | | |     / _ \\  
 ___) || |  ___) || | | |___| |  | | | |\\  | |___| |_) | |_| | |___ / ___ \\ 
|____/ |_| |____/ |_| |_____|_|  |_| |_| \\_|_____|____/ \\___/|_____/_/   \\_\\

</pre>`)
      await typeMessage("Enter a number to select the corresponding option")
      await typeMessage("1) Start")
      await typeMessage("2) Settings")
      await typeMessage("3) What is this?")
      await typeMessage("4) Credits")
      return
    },
  )
  optionStack.addOption({
    // GAME
    "1": async()=>{
      menuStack.addMenu(
        "Main",
        async ()=>{
          await typeMessage("Enter a number to select the corresponding option")
          await typeMessage("1) Space")
          await typeMessage("2) Archives")
          await typeMessage("3) Pass time")
          await typeMessage(`(type "back" to return)`)
        }
      )
      optionStack.addOption({
        // GAME > SPACE
        "1": async()=>{
          menuStack.addMenu(
            "Space",
            async ()=>{
              await typeMessage("Enter a number to select the corresponding option")
              await typeMessage("1) Search for new planets")
              let index = 1; // amount of non-generated options
              for(let planet of DATA.planets){
                if(planet.status < 0) continue;
                index++
                await typeMessage(`${index}) ${planet.name}`)
              }
              await typeMessage(`(type "back" to return)`)
            }
          )
          let options = {
            // GAME > SPACE > SEARCH
            "1": async()=>{
              menuStack.addMenu(
                "Search",
                async ()=>{
                  for(let i = 0; i < 1+Math.random()*4|0; i++){
                    await typeMessage("Searching...", 100)
                  }
                  // No planet existing
                  if(DATA.availablePlanet === undefined){
                    await typeMessage("No planets found.")
                  // Planet exists and ready + rand check
                  }else if(DATA.availablePlanet.ready === true && 1 > Math.random()){ // TODO: MAKE IT SCALE WITH TIME SINCE LAST PLANET FOUND
                    await typeMessage("Planet found!")
                    await typeMessage("Researching...", 200)
                    await typeMessage("Receiving data...", 200)
                    await typeMessage(`PLANET NAME: ${DATA.availablePlanet.name}`, 100)
                    await wait(1500)
                    await typeMessage(`YEAR: ${DATA.availablePlanet.year}`, 100)
                    await wait(1500)
                    await typeMessage(`TYPE: ${DATA.availablePlanet.type}`, 100)
                    await wait(1500)
                    await typeMessage(`ENVIRONMENTS: ${DATA.availablePlanet.environments.length}`, 100)
                    await wait(1500)
                    await typeMessage(`SPECIES: ${DATA.availablePlanet.species.length}`, 100)
                    await wait(1500)
                    await typeMessage("Data recorded!")
                    await typeMessage("Further research required...")
                    DATA.planets.push(DATA.availablePlanet)
                    DATA.availablePlanet = new Planet()
                    await wait(1500)
                    menuStack.pop()
                    optionStack.pop()
                    await optionStack.top()[1]() // refresh planet list
                  }else{
                  // Planet not ready or rand check failed
                    await typeMessage("No planets found.")
                    await typeMessage("(You have a feeling theres something out there...)") // TODO: Hint if theres a planet ready but failed random check or if the planet is just not ready yet
                  }
                  await wait(1500)
                  await menuStack.prev()
                }
              )
            },
             
            "back": async()=>{await prev()}
          }
          // GAME > SPACE > PLANET NAME
          let index = 1; // amount of non-generated options
          for(let planet of DATA.planets){
            if(planet.status < 0) continue;
            options[++index] = async()=>{
              menuStack.addMenu(
                `${planet.name}`,
                async ()=>{
                  let hsd = planet.historicalDevelopment
                  await typeMessage(`=== ${planet.name} ===`)
                  await typeMessage(`Year: ${planet.year}`)
                  await typeMessage(`Type: ${planet.type}`)
                  await typeMessage(`Environments: ${planet.research.knownEnvironments.length ? planet.research.knownEnvironments.join(", ")+(planet.research.unknownEnvironments.length ? ", "+planet.research.unknownEnvironments.map(x=>"?").join(", ") : "") : planet.research.unknownEnvironments.map(x=>"?").join(", ")}`);
                  await typeMessage(`Species: ${planet.research.knownSpecies.length ? planet.research.knownSpecies.join(", ")+(planet.research.unknownSpecies.length ? ", "+planet.research.unknownSpecies.map(x=>"?").join(", ") : "") : planet.research.unknownSpecies.map(x=>"?").join(", ")}`);
                  await typeMessage(" ")
                  await typeMessage(`1) Research ${hsd?"(!)":""}`)
                  await typeMessage("2) Abandon")
                  await typeMessage(`${hsd?"LOCKED":"3"}) Catalyze`)
                  await typeMessage(`${hsd?"LOCKED":"4"}) Explore`)
                  await typeMessage(`(type "back" to return)`)
                }
              )
              optionStack.addOption({
                // GAME > SPACE > PLANET NAME > RESEARCH
                "1": async()=>{
                  if(planet.research.complete === true && planet.historicalDevelopment === false){
                    await typeMessage("Research on this planet is complete.")
                    await typeMessage("Allow research after to build on memory and to clear up any unfinished research reports...")
                    return;
                  }
                  menuStack.addMenu(
                    `Research`,
                    async()=>{
                      if(planet.historicalDevelopment === true){
                        await typeMessage("Major historical developments detected...")
                        await typeMessage("Connecting to satelites...", 100)
                        await typeMessage(`Connected, ${100*Math.random()|0} satelites active!`)
                        await typeMessage("Downloading data...", 200)
                        await typeMessage("Analyzing...", 50)
                        await typeMessage("Extracting changes...", 150)
                        await typeMessage("TODO: add historical developments")
                      }
                      
                      let research = "";
                      if(planet.research.knownEnvironments.length === 0 ||
                           planet.research.unknownEnvironments.length > planet.research.unknownSpecies.length){
                          research = "environment"
                      }else if(planet.research.unknownSpecies.length > planet.research.unknownEnvironments.length){
                          research = "biological"
                      }else {
                        research = Math.random()>0.5?"environment":"biological"
                      }
                      
                      if(research === "environment"){
                        research = planet.researchEnvironment()
                      }
                      if(research === "biological"){
                        research = planet.researchSpecies()
                      }
                      
                      if(
                        planet.research.unknownEnvironments.length === 0 &&
                        planet.research.unknownSpecies.length=== 0
                      ){
                        planet.research.complete = true
                      }
                      
                      await typeMessage("Organizing mission...", 100)
                      await typeMessage("Preparing drone...", 200)
                      await typeMessage("Traveling...", 300)
                      await typeMessage("Deploying drone...", 150)
                      await typeMessage("Gathering data...", 200)
                      await wait(2000)
                      await typeMessage("Data gathered!")
                      await typeMessage("Downloading...", 200)
                      research = await research
                      await typeMessage(`FILE NAME: ${research[0]}`)
                      await typeMessage(`CREATION YEAR: ${research[1]}`)
                      await typeMessage(`FILE CONTENT:\n${research[2]}`)
                      await typeMessage("Uploading...", 150)
                      await wait(250)
                      await typeMessage(`Data uploaded to archives!`)
                      await typeMessage(`(type "back" to return)`)
                    }
                  )
                  optionStack.addOption({
                    back: async()=>{await prev()}
                  })
                },
                
                // GAME > SPACE > PLANET NAME > ABANDON
                "2": async()=>{
                  menuStack.addMenu(
                    `Abandon`,
                    async ()=>{
                      await typeMessage("Abandoning a planet will permanently remove it from your list of planets.")
                      await typeMessage("Do you want to continue? y/n")
                    }
                  )
                  optionStack.addOption({
                    "y": async()=>{
                      planet.status = -1;
                      
                      await typeMessage("Would you like to delete the planetary archieves too? y/n/back")
                      let finishDelete = async()=>{
                        await typeMessage("Clearing storage...", 200)
                        await typeMessage("Updating memory...", 100)
                        await typeMessage(`${planet.name}'s fate will go unknown...`, 50)
                        await wait(1000)
                        optionStack.pop()
                        
                        menuStack.pop()
                        optionStack.pop()
                        
                        menuStack.pop()
                        optionStack.pop()
                        
                        menuStack.pop()
                        optionStack.pop()
                        await optionStack.top()[1]()
                      }
                      optionStack.addOption({
                        "y": async()=>{
                          planet.status = -2
                          await typeMessage("Marking archieves for deletion...", 50)
                          await finishDelete()
                        },
                        "n": async()=>{
                          await finishDelete()
                        },
                        "back": async()=>{
                          planet.status = 0;
                          optionStack.pop()
                        }
                      })
                    },
                    "n": async()=>{await prev()}        
                  })
                },
                
                // GAME > SPACE > PLANET NAME > CATALYZE
                "3": async()=>{
                  if(planet.historicalDevelopment){
                    await typeMessage("There have been significant developments since we've last visited. We need to research the changes first.")
                    return
                  }
                  menuStack.addMenu(
                    "Catalyze",
                    async ()=>{
                      await typeMessage("TODO: All of this")
                      await typeMessage("How would you like to interfere?")
                      await typeMessage("1) Education")
                      await typeMessage("2) Politics")
                      await typeMessage("3) Environmental")
                      await typeMessage("4) Global")
                      await typeMessage("5) Other")
                      await typeMessage(`(type "back" to return)`)
                    }
                  )
                  
                },
                
                // GAME > SPACE > PLANET NAME > EXPLORE
                "4": async()=>{
                  if(planet.historicalDevelopment){
                    await typeMessage("There have been significant developments since we've last visited. We need to research the changes first.")
                    return
                  }
                  if(planet.research.unknownEnvironments.length !== 0 || planet.research.unknownSpecies.length !== 0){
                    await typeMessage("Not enough is known about the planet to explore it yet, it's too dangerous.")
                    return
                  }
                  await typeMessage("TODO")
                },
                
                "back": async()=>{await prev()},
              })
            }
          }
          optionStack.addOption(options)
        },
        
        // GAME > ARCHIVES
        "2": async()=>{
          menuStack.addMenu(
            `Archieves`,
            async(prev)=>{
              if(prev !== true){
                await typeMessage("Accessing cold storage...", 25)
                await typeMessage("Spinning up disks...", 25)
                await typeMessage("Downloading...", 75)
                await wait(250)
                await clearTerminal()
                await typeMessage(menuStack.toString())
                await typeMessage(" ")
              }
              await typeMessage("Enter a number to select the corresponding option")
              let index = 1;
              for(let planet of DATA.planets){
                if(planet.status < -1) continue;
                await typeMessage(`${index++}) ${planet.name} ${planet.status===-1?"(Deleted)":""}`)
              }
              if(index === 1) await typeMessage("* You have not discovered any planets")
              await typeMessage(`(type "back" to return)`)
            }
          )
          let option = {
            "back": async()=>{await prev()}
          }
          let index = 1;
          for(let planet of DATA.planets){
            if(planet.status < -1) continue;
            option[index++] = async()=>{
              menuStack.addMenu(
                `${planet.name}`,
                async()=>{
                  await typeMessage("Enter a number to select the corresponding option")
                  let index = 1;
                  for(let log of planet.logs){
                    await typeMessage(`${index++}) ${log[0]} (YEAR ${log[1]})`)
                  }
                  if(planet.logs.length === 0){
                    await typeMessage("* There are no logs for  this planet")
                  }
                  await typeMessage(`(type "back" to return)`)
                }
              )
              let options = {
                "back": async()=>{await prev()}
              }
              let index = 1;
              for(let log of planet.logs){
                options[index++] = async()=>{
                  menuStack.addMenu(
                    `${log[0]} (YEAR ${log[1]})`,
                    async()=>{
                      await displayMessage(`${log[2]}`)
                      await typeMessage(`(type "back" to return)`)
                    }
                  )
                  optionStack.addOption({
                    "back": async()=>{await prev()}
                  })
                }
              }
              optionStack.addOption(options)
            }
          }
          optionStack.addOption(option)
        },
        
        // GAME > PASSING TIME
        "3": async()=>{
          menuStack.addMenu(
            "Passing time",
            async ()=>{
              await typeMessage(`Enter how many years you want to pass or type "back" to return`)
            }
          )
          optionStack.addOption({
            "default": async(msg)=>{
              let num = Number(msg)|0
              if(num <= 0){
                await typeMessage("ERROR: Invalid number")
                return
              }
              await typeMessage("TODO: Spice this up")
              await typeMessage(`Passing ${num} years...`, 100)
              await prev()
            },
            "back": async()=>{await prev()}
          })
        },
        
        "back": async()=>{await prev()}
      })
    },
    
    // SETTINGS
    "2": async()=>{
      menuStack.addMenu(
        "Settings",
        async ()=>{
          await typeMessage("Enter a number to select the corresponding option")
          await typeMessage("1) Scanlines")
          await typeMessage("2) TODO: AI Api")
          await typeMessage(`(type "back" to return)`)
        }
      )
      optionStack.addOption({
        // SETTINGS > SCANLINES
        "1": async()=>{
          await typeMessage("TODO")
        },
        
        "back": async()=>{await prev()}
      })
    },
    
    // INFORMATION
    "3": async()=>{
      menuStack.addMenu(
        "Information",
        async ()=>{
          await typeMessage("This is an ai assisted sandbox rpg where you monitor and play with entire planets")
          await typeMessage(`(type "back" to return)`)
        }
      )
      optionStack.addOption({
        back: async()=>{await prev()}
      })
    },
    
    // CREDITS
    "4": async()=>{
      menuStack.addMenu(
        "Credits",
        async ()=>{
          await typeMessage("Made by:")
          await typeMessage("* Ayden Greenan (https://drako-hyena.glitch.me)")
          await typeMessage("Inspired by:")
          await typeMessage("* Epitaph (https://mkremins.github.io/epitaph/)")
          await typeMessage("* Dwarf Fortress (https://www.bay12games.com/dwarves/)")
          await typeMessage("Most Sounds:")
          await typeMessage("* Sonniss GDC 2024 (https://gdc.sonniss.com/)")
          await typeMessage("Keyboard Sounds:")
          await typeMessage("* MeepEw (https://www.reddit.com/user/MeepEw/)")
          await typeMessage(`(type "back" to return)`)
        }
      )
      optionStack.addOption({
        back: async()=>{await prev()}
      })
    },
    
    // DEV CHEATS
    "5": async ()=>{
      await typeMessage("ERROR! ILLEGAL MEMORY ACCESS!")
      for(let i = 0; i < 5; i++){
        let str = `0x${Math.floor(Math.random()*((8)**10)).toString(16)}`
        for(let a = 0; a < 6*Math.random()|0; a++){
          str += ` > 0x${Math.floor(Math.random()*((8)**10)).toString(16)}`
        }
        await displayMessage(str)
        await wait(100)
      }
      await typeMessage("SHUTTING DOWN SYSTEM")
      let str = ""
      for(let i = 0; i < 20; i++){
        str += (Math.random()*(10**5)).toString(32).replace(".", "")
      }
      await typeMessage(str)
      await wait(250)
      menuStack.addMenu(
        "^E(RR.0R",
        async () => {
          await typeMessage("P_R0`CES$ HALT#D")
          await wait(500)
          await typeMessage("ENTER YOU COMMAND")
          await typeMessage("back) Return")
        }
      )
      optionStack.addOption({
        "back": async()=>{
          await prev()
        }
      })
    },
    
    "back": async ()=>{
      await typeMessage("Are you sure? (y/n)")
      optionStack.addOption({
        y: async ()=>{
          optionStack.prev()
          optionStack.prev()
          await typeMessage("Shutting down...");
          await wait(1350);
          playAudio("Switch")
          document.getElementById("crt").style.background = "black"
           document.getElementById("crt").style.borderStyle = "none"
        },
        n: async ()=>{
          await typeMessage("Ok")
          optionStack.prev()
        }
      })
    }
  })
}

async function processInput(msg){
  await typeMessage(msg)
  if(optionStack.top() === undefined){
    return;
  };
  if(optionStack.top()[msg]){
    await optionStack.top()[msg]()
  }else if(optionStack.top().default){
    await optionStack.top().default(msg)
  }else{
    return await typeMessage("ERROR: Invalid command")
  }
}

export {processInput, startGame, menuStack, optionStack}