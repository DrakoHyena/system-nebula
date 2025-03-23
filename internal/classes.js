import { genPlanetName, genEnvironment, genSpeciesName, genCharacteristic, genColor, genPlanetType } from "/data/generators.js"
import { generateReq, summerizeReq } from "/data/ai.js"


class Planet {
	constructor(minSpecies = 0) {
		this.ready = false;
		this.status = 0

		// Planet
		this.name = genPlanetName()
		this.year = 1000000 * Math.random() | 0
		this.type = genPlanetType()
		this.environments = [];
		for (let i = 0; i < 3; i++) this.environments.push(genEnvironment())

		// Species
		this.species = [];
		for (let i = 0; i < (3 * Math.random() | 0) + minSpecies; i++) this.species.push(new Species())

		// Research
		this.research = {
			unknownEnvironments: structuredClone(this.environments),
			knownEnvironments: [],
			unknownSpecies: this.species.map(specie => specie.name),
			knownSpecies: [],
			complete: false,
		}

		this.yearsSinceLastHistoricalDevelopment = 0
		this.historicalDevelopment = false

		// Stories
		this.logs = []

		// Memories
		this.memories = []

		// Establish background
		this.makeHistory("Very briefly, what natural resources does this planet contain that can be used?").then((resources) => {
			this.makeHistory(`Write a brief history for this planet and its species.
Keep this in mind:
* The planet can have different environments on different parts
* The species can co-exist if it makes sense
* This is a story/history`).then(() => {
				this.ready = true
			})
		})
	}

	promiseReady() {
		return new Promise((res, rej) => {
			let interval = setInterval(() => {
				if (this.ready === false) return
				clearInterval(interval)
				res()
			}, 200)
		})
	}

	async makeHistory(instruction) {
		let entry = await this.makeEntry(instruction)
		await this.makeMemory(entry)
		return entry;
	}

	async makeEntry(instruction) {
		return await generateReq(instruction, this.aiify())
	}

	async makeMemory(content) {
		let memory = await summerizeReq(content)
		this.memories.push([this.year, memory])
		return memory
	}

	// TODO: Make this happen when we research developments
	async makeHistoricalDevelopmentLog() {
		let entry = await this.makeHistory(`INSTRUCTIONS:
Generate a story based off this planet (${this.name}), it's inhabitants, and it's envrionments. The story should revolve around one or many historical developments that have happened since we've last visited (${this.yearsSinceLastHistoricalDevelopment} years ago).
These developments are being recorded via satalites that are orbiting the planet. The effects that this story has can be boundless; If it results in a species extinction or planetary destruction, go with that.
The story should take the world-wide impact into account, but generally should be limited to the involved species/environments.
`)
		let title = "Major Historical Developments"
		this.logs.push([title, this.year, entry])
		return [title, this.year, entry]
	}

	async researchEnvironment() {
		let selectedEnvironment = this.research.unknownEnvironments.splice(this.research.unknownEnvironments.length * Math.random() | 0, 1)[0]
		let entry = await generateReq(`INSTRUCTIONS:
Generate a story where a sci-fi high-tech drone is on a mission to research/explore the ${selectedEnvironment} environment on ${this.name}.
Keep in mind what research we already have, this should impact and alter the story (which drone we might send, if an unknown species or feature destroys us, outcome, how we might navigate, etc.)
Be sure to incorporate every single aspect of the ${selectedEnvironment} into the story via plain text.
DO NOT REVEAL ANY UNKNOWN INFORMATION IN THE STORY aside from ${selectedEnvironment} -- You are allowed to make the story short if you have to.
The story should be treated as a seperate mission from past missions, and shouldnt be too similar to previous missions.

${this.aiifyResearch()}
`, `Here is some background for the story you have to generate:
BACKGROUND:
${this.aiify()}`)
		this.research.knownEnvironments.push(selectedEnvironment)
		let title = `Environmental Research - ${selectedEnvironment}`
		this.logs.push([title, this.year, entry])
		await this.makeMemory(entry)
		return [title, this.year, entry]
	}

	async researchSpecies() {
		let selectedSpecies = this.research.unknownSpecies.splice(this.research.unknownSpecies.length * Math.random() | 0, 1)[0]
		let entry = await generateReq(`INSTRUCTIONS:
Generate a story where a sci-fi high-tech drone is on a mission to research/explore the ${selectedSpecies} environment on ${this.name}.
Keep in mind what research we already have, this should impact and alter the story (which drone we might send, if an unknown species or feature destroys us, outcome, how we might navigate, etc.)
Be sure to incorporate every single aspect of the ${selectedSpecies} into the story via plain text.
DO NOT REVEAL ANY UNKNOWN INFORMATION IN THE STORY aside from ${selectedSpecies} -- You are allowed to make the story short if you have to.
The story should be treated as a seperate mission from past missions, and shouldnt be too similar to previous missions.

${this.aiifyResearch()}
`, `Here is some background for the story you have to generate:
BACKGROUND:
${this.aiify()}`)
		this.research.knownSpecies.push(selectedSpecies);
		let title = `Biological Research - ${selectedSpecies}`
		this.logs.push([title, this.year, entry])
		await this.makeMemory(entry)
		return [title, this.year, entry]
	}

	aiifyResearch() {
		return `
CURRENT RESEARCH:
KNOWN ENVIRONMENTS: ${this.research.knownEnvironments.join(", ")}
UNKNOWN ENVIRONMENTS: ${this.research.unknownEnvironments.join(", ")}
KNOWN SPECIES: ${this.research.knownSpecies.join(", ")}
UNKNOWN SPECIES: ${this.research.unknownSpecies.join(", ")}
`;
	}

	aiify() {
		let memoryNum = 0;
		return `
PLANET: ${this.name}
YEAR: ${this.year}
SIZE: ${this.size}
ENVIRONMENTS:
${this.environments.map(environment => `* ${environment}`).join("\n")}
INHABITANTS:
${this.species.map(species => species.aiify()).join("\n")}
HISTORY/MEMORY TOKENS:
${this.memories.map(memory => `MEMORY TOKEN ${memoryNum++} - YEAR ${memory[0]}:\n${memory[1]}`).join("\n")}
          `
	}
}

class Species {
	constructor() {
		this.name = genSpeciesName()
		this.characteristics = [];
		for (let i = 0; i < 3; i++) this.characteristics.push(genCharacteristic())
		this.colors = [];
		for (let i = 4 * Math.random() | 0; i > 0; i--) this.colors.push(genColor())
	}
	aiify() {
		return `
SPECIES NAME: ${this.name}
CHARACTERISTICS:
${this.characteristics.map(characteristic => `* ${characteristic}`).join("\n")}
    `
	}
}

export { Planet }