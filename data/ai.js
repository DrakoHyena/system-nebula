import { menuStack, optionStack } from "/internal/game.js"
import { typeMessage, displayMessage, wait } from "/display/terminal.js"

let AI_SETTINGS = {
  builtInAvailable: true,
  openRouterKey: localStorage.getItem("openrouterkey")
}

async function supportMessage(){
  try{
    await window.ai.languageModel.create()
    await window.ai.summarizer.create()
  }catch(err){
    AI_SETTINGS.builtInAvailable = false
    let msg = typeMessage("Loading dependencies...", 50)
    try{
      await generateReq("hi")
      await msg
      return;
    }catch(err){
      console.log("Failed to generate request using saved key", err)
    }
    await msg
    for(let i = -10; i < Math.random()*10|0; i++){
      let str = `0x${Math.floor(Math.random()*((8)**10)).toString(16)}`
      for(let a = 0; a < 6*Math.random()|0; a++){
        str += ` > 0x${Math.floor(Math.random()*((8)**10)).toString(16)}`
      }
      await displayMessage(str)
      await wait(100)
    }
    await displayMessage(`FATAL ERROR: BOOT PROCESS FAILED`, 50)
    await typeMessage("Gathering logs...", 100)
    await typeMessage(" ")
    await typeMessage("Your browser does not support the chrome AI api!")
    await typeMessage(" ")
    await typeMessage("== If you have a decent gpu ==")
    await typeMessage("Go to chrome://flags and set the following:")
    await typeMessage("* Text Safety Classifier - Disabled (sometimes restricts the AI's output which can cause errors)")
    await typeMessage("* Prompt API for Gemini Nano - Enabled")
    await typeMessage("* Summarization API for Gemini Nano - Enabled")
    await typeMessage("(While the options might be there, the AI might still be unsupported on some devices)")
    await typeMessage(" ")
    await typeMessage("== If you dont have a decent gpu ==")
    await typeMessage("Make an Open Router API key and enter it below. You can always change it in settings and it will always be completely free.")
    await displayMessage(`* <a href="https://openrouter.ai/" target="_blank">https://openrouter.ai/</a>`)
    await typeMessage("* Sign in/Make account")
    await typeMessage("* Keys")
    await typeMessage("* Create api key")
    await typeMessage("* Paste it below")
    await typeMessage(" ")
    await typeMessage("== If you dont care ==")
    await typeMessage("Type \"skip\" to continue anyways. AI features will not function as intended.")
    return new Promise((res, rej)=>{
      optionStack.addOption({
        skip: async()=>{
          res()
        },
        default: async(msg)=>{
          AI_SETTINGS.openRouterKey = msg
          try{
            await generateReq("test")
            localStorage.setItem("openrouterkey", msg)
            optionStack.prev()
            res()
          }catch(err){
            await typeMessage("Invalid api key! Try again!")
          }
        }
      })
    })
  }
  return true;
}

async function generateReq(content, sysMsg=""){
  if(AI_SETTINGS.builtInAvailable === true){
    
  }else{
    let res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AI_SETTINGS.openRouterKey}`,
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        model: 'sophosympatheia/rogue-rose-103b-v0.2:free',
        messages: [
          {
            role: "system",
            content: sysMsg,
          },
          {
            role: 'user',
            content: content,
          },
        ],
      }),
    })
    let data = await res.json()
    if(data.error){
      console.log(data)
      throw new Error(`Model errored in response\n${JSON.stringify(data.error)}`)
    }
    console.log("GENERATION", data.choices[0].message.content)
    return data.choices[0].message.content
  }
}

async function summerizeReq(content){
  if(AI_SETTINGS.builtInAvailable === true){
    
  }else{
    let res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AI_SETTINGS.openRouterKey}`,
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemma-2-9b-it:free',
        messages: [
          {
            role: "system",
            content: "You are a summerizer. Summerize everything the user gives to you into point that cut all the fluff out of the content and provide short concise points.",
          },
          {
            role: 'user',
            content: content,
          },
        ],
      }),
    })
    let data = await res.json()
    if(data.error){
      console.log(data)
      throw new Error(`Model errored in response\n${JSON.stringify(data.error)}`)
    }
    console.log("SUMMARY", data.choices[0].message.content)
    return data.choices[0].message.content
  }
}

export { supportMessage, generateReq, summerizeReq }