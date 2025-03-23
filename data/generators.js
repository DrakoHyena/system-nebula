function makeName(array, length){
  let name = ""
  while(name.length < length){
    let selection = array[array.length*Math.random()|0]
    name += selection.substr(selection.length*Math.random()|0, (selection.length*Math.random()|0)+1)
  }
  name = name.toLowerCase()
  return name[0].toUpperCase() + name.slice(1);
}

let planetNames = [
  "Velloria",
  "Arcturus",
  "Xenara",
  "Zynthar",
  "Drakos",
  "Eryndor",
  "Calyptus",
  "Vornis",
  "Nythera",
  "Lunaris",
  "Furnix",
  "Crixora",
  "Nirathis",
  "Zerenthis",
  "Altharion",
  "Baltha",
  "Quenara",
  "Viroxis",
  "Syrithia",
  "Opharis",
  "Krelos",
  "Eldoria",
  "Malthoria",
  "Zelvador",
  "Xerathos",
  "Phyris",
  "Lorthian",
  "Opharion",
  "Trellis",
  "Xylona",
  "Voritha",
  "Kyvathis",
  "Draxan",
  "Vorath",
  "Ilithar",
  "Pyros",
  "Solvinia",
  "Zorath",
  "Arisca",
  "Zythos",
  "Vessira",
  "Valdar",
  "Tethra",
  "Ryloth",
  "Orrin",
  "Drinor",
  "Vathira",
  "Glorion",
  "Cyphara",
  "Icaris",
  "Dronis",
  "Selaris",
  "Vantheos",
  "Thyros",
  "Valnath",
  "Xyros",
  "Khaldar",
  "Ultrion",
  "Elenara",
  "Venisca",
  "Zynithos",
  "Helmor",
  "Astraeus",
  "Draxion",
  "Phariona",
  "Iridia",
  "Ravonix",
  "Siranth",
  "Zalithor",
  "Arzanis",
  "Khiron",
  "Valerian",
  "Lurian",
  "Krosith",
  "Tharion",
  "Solirith",
  "Vincora",
  "Eryndra",
  "Luthar",
  "Teralis",
  "Quirion",
  "Xentharia",
  "Lunara",
  "Zyphora",
  "Nirlan",
  "Trellis",
  "Orlithos",
  "Thyrian",
  "Kinthar",
  "Cyronis",
  "Nethora",
  "Veyra",
  "Dranox",
  "Treyros",
  "Jorthon",
  "Zyllis",
  "Ardalos",
  "Nexira",
  "Vorastra",
  "Synthera",
  "Orynth",
  "Cyanos",
  "Galmaris",
  "Xerithon",
  "Ulthar",
  "Ragnar",
  "Vithras",
  "Liona",
  "Lotharion",
  "Thryxor",
  "Rexilus",
  "Paxylis",
  "Zyrosia",
  "Tathura",
  "Lorathian",
  "Astrixus",
  "Perion",
  "Evolis",
  "Venthara",
];

let environments = [
    // Common Environments  
    "Arid", "Wet", "Cold", "Snowy", "Tropical", "Temperate", "Frigid", "Volcanic",  
    "Subterranean", "Swampy", "Desert", "Savanna", "Tundra", "Glacial", "Mountainous",  
    "Cavernous", "Forested", "Dense Jungle", "Coastal", "Oceanic", "Deep Sea",  
    "Shallow Reef", "Barren Wasteland", "Radioactive", "Toxic", "Poisonous Marsh",  
    "Wind-swept", "Superheated", "Icy Tundra", "Crystal Fields", "Flooded Plains",  
    "Magma Flats", "Ashen Wasteland", "Canyon-filled", "Floating Islands",  
    "Gas Giant Upper Layers", "Metallic Surface", "Sulfuric Fumes", "Drought-stricken",  
    "Monsoon-ridden", "Storm-plagued", "Perpetual Lightning", "Frozen Ocean",  
    "Salt Flats", "Mega-forests", "Spore-infested", "Carnivorous Jungle",  
    "Underground Rivers", "Skyborne Plateaus", "Microgravity Surface", "Super-dense Terrain",  
    "Tidally Locked", "Perpetual Twilight", "Aurora-covered", "Glowing Fungal Fields",  
    "Ever-burning Ember Fields", "Eroded Badlands", "Murky Bogs", "Vast Caves",  
    "Methane Lakes", "Steam Vents", "Fossilized Plains", "Bio-luminescent Wetlands",  
    "Red Sand Dunes", "Black Rock Mountains", "Petrified Forest", "Iridescent Crystal Shores",  
    "Endless Geysers", "Gravity-warped Valleys", "Sub-zero Desert", "Permafrost Cracks",  
    "Giant Algae Fields", "Undulating Sand Oceans", "Molten Core Surface",  
    "Titanic Glacier Peaks", "Shifting Magnetic Fields", "Dust Storm Basins",  
    "Cyclonic Stormworld", "Toxic Green Swamps", "Frozen Methane Seas",  
    "Deep Ocean Trenches", "Superheated Hydrothermal Vents", "Shimmering Ice Spires",  
    "Interstellar Debris Fields", "Moonlit Permafrost", "Acidic Rainforests",  
    "Firestorm Wastes", "Hollowed Caverns", "Ancient Ruins Overgrowth",  
    "Artificial Terraforming", "Fractured Landscape", "Endless Steppe",  
    "High-Altitude Cliffs", "Electric Storm Highlands", "Lush River Valleys",  
    "Eternal Night Zone", "Eternal Daylight Zone", "Ice-choked Fjords",  
    "Vibrant Megaflora", "Floating Vapor Reefs", "Glass-like Lava Plains",  
    "Artificial Dyson Enclosures", "Cyclonic Maelstrom Zones",  

    // Extreme & Alien Worlds  
    "Frozen Ammonia Tundra", "Plasma Storm Expanse", "Silicate Desert", "Ice Volcano Fields",  
    "Radiant Gas Plains", "Perpetual Earthquake Zone", "Levitating Crystal Plateaus",  
    "Hyper-oxygenated Swamps", "Poisonous Cloudbanks", "Giant Fungal Towers",  
    "High-Pressure Ocean Abyss", "Razor Grass Plains", "Sentient Jungle", "Black Sand Shores",  
    "Bioluminescent Coral Forests", "Carnivorous Cloud Forests", "Liquid Metal Rivers",  
    "Electric Tundra", "Lava Tornado Fields", "Toxic Tar Pits", "Hypermagnetic Stormlands",  
    "Pulsar-Irradiated Wastes", "Frozen Gas Geysers", "Living Stone Fields",  
    "Giant Sandworm Dunes", "Dark Matter Veins", "Intergalactic Ice Highways",  
    "Hollow Planet Interiors", "Endless Rift Valleys", "Solar Flare Battered Plains",  
    "Frozen Vapor Atmosphere", "Iron Rain Basins", "Subterranean Ice Caves",  
    "Spore Blizzard Wastes", "Cliffside Waterfalls", "Perpetual Lava Flows",  
    "Subzero Liquid Nitrogen Lakes", "Eternal Ashfall Zones", "Planet-Sized Coral Reefs",  
    "Ever-Rotting Fungal Swamps", "Magma Vortex Fields", "Tectonic Chaos Expanse",  
    "Blood-Red Oceanic Abyss", "Cave Systems with Floating Lakes", "Sky Islands with No Gravity",  
    "Permafrost Tundra with Hidden Caverns", "Frozen Storms with Lightning Ice",  
    "Corrosive Rain Wastelands", "Solar Tidal Warped Surface", "Echoing Crystal Abyss",  

    // Hypothetical Sci-Fi Environments  
    "Artificial Gravity Ruins", "Gargantuan Gas Blimps", "Artificially Sculpted Terraces",  
    "Interdimensional Riftlands", "Plasma Storm Barrens", "Fractal Sand Dunes",  
    "Self-Assembling Nanobot Jungles", "Orbital Tundra", "Collapsing Reality Zones",  
    "Living Metal Hive Planes", "Planet-Wide Machine Cities", "Endless Mirror Cliffs",  
    "Sunlight-Deprived Swamps", "Hallucinogenic Fungal Forests", "Omnidirectional Gravity Fields",  
    "Tesseract Jungle", "Soundwave-Frozen Ice Caverns", "AI-Controlled Terraforming Zones",  
    "Symbiotic Rock-Flesh Wastes", "Giant Biomechanical Hiveworld", "Nanite-Infested Oceans",  
    "Eldritch Coral Reefs", "Electric Fog Islands", "Time-Dilated River Valleys",  
    "Shifting Geothermal Maze", "Light-Bending Sandstorms", "Ephemeral Floating Glaciers",  
    "Planetary Coral Reef with Gas Bubble Cities", "Organic Megastructure Landscape",  
    "Magnetized Tectonic Riftworld", "Dark Energy-Infused Jungle",  
    "Lightning-Powered Fungal Plains", "Self-Luminescent Plant Wasteland",  
    "Hyper-Compressed Nebula Canopies", "Gigantic Shell-Fragmented Canyons",  
    "Eternal Dusk Desert", "Tornado-Harboring Gas Fields",  
    "Mega-Organism Infested Root Forest", "Biomechanically Sculpted Cliffs",  
];

let planetTypes = [    
    "Small Moon", "Medium Moon", "Large Moon", "Titanic Moon",  

    // Small to Medium Planets  
    "Dwarf Planet", "Compact Planet", "Small Planet", "Medium Planet", "Standard Planet",  

    // Large Planets  
    "Large Planet", "Massive Planet", "Ultra-Massive Planet", "Titanic Planet",  
    "Mega Planet", "Colossal Planet"
]

let speciesNames = [
    "Xyphorans",
    "Draventh",
    "Zygliths",
    "Korthari",
    "Velmari",
    "Trelvex",
    "Orrakans",
    "Syphirans",
    "Vorthelians",
    "Nyxari",
    "Quorvins",
    "Zenthari",
    "Klymari",
    "Threxians",
    "Ithari",
    "Rylvex",
    "Dralthans",
    "Morthi",
    "Zeraki",
    "Ultharians",
    "Xenlorians",
    "Tyxarans",
    "Phalvex",
    "Eryndari",
    "Cyrnosians",
    "Valkari",
    "Tromari",
    "Orilthians",
    "Glythari",
    "Jornath",
    "Sylverans",
    "Krexori",
    "Thyrraks",
    "Vorlians",
    "Zorvathi",
    "Elnarans",
    "Drakonis",
    "Luntheri",
    "Aelzari",
    "Venlorians",
    "Zynthari",
    "Tyrmari",
    "Quenthari",
    "Nexliths",
    "Ralthorans",
    "Kradithi",
    "Oryxari",
    "Zyphirans",
    "Sylthari",
    "Norvexians",
    "Helmari",
    "Glavari",
    "Thal'Zorans",
    "Ulvithians",
    "Kelzarians",
    "Xerthans",
    "Jarnethians",
    "Ythari",
    "Caldrexians",
    "Orsivans",
    "Vrythari",
    "Zoltharians",
    "Draxili",
    "Kyvarans",
    "Tharvexians",
    "Phyxori",
    "Quorlan",
    "Eldari",
    "Zilthari",
    "Tovari",
    "Nalvexans",
    "Syvorians",
    "Kronthari",
    "Vessari",
    "Jalriths",
    "Torvixians",
    "Nyxorian",
    "Branthari",
    "Zirneth",
    "Tyraliths",
    "Vorvexians",
    "Ulnari",
    "Xilthari",
    "Drelthians",
    "Gornaxians",
    "Sylthiri",
    "Thryxians",
    "Velthirans",
    "Orvathians",
    "Drazeliths",
    "Xenthari",
    "Zorthani",
    "Cylthari",
    "Thalorans",
    "Nyxirans",
    "Zyltorans",
    "Trelvani",
    "Jovari",
    "Phentari",
    "Ulzorans",
    "Kyroxians",
    "Varinthari",
    "Morthiliths",
    "Zephirans",
    "Quinthari",
    "Rylthari",
    "Exorians"
];

let characteristics = [
    // Common Physical Traits  
    "Tall", "Short", "Lanky", "Stocky", "Slender", "Muscular", "Gigantic", "Miniature",  
    "Feathered", "Scaled", "Furred", "Slimy", "Chitinous", "Transparent", "Glowing",  
    "Bioluminescent", "Iridescent", "Spiked", "Horned", "Frilled", "Tentacled",  
    "Four-Armed", "Multi-Limbed", "Webbed Hands", "Clawed Hands", "Hooved",  
    "Prehensile Tail", "Multiple Eyes", "Cyclopean", "Compound Eyes", "Nocturnal Vision",  
    "Eyeless", "Gills", "Multiple Mouths", "Beaked", "Snouted", "Mandibles",  
    "Exoskeletal", "Shell-Plated", "Porous", "Ooze-Like", "Gelatinous", "Rock-Like",  
    "Magnetic Skin", "Crystalline", "Shimmering", "Metallic", "Radiation-Resistant",  
    "Self-Regenerating", "Photosynthetic", "Ethereal", "Gas-Based", "Partially Invisible",  
    "Gravity-Adaptive", "Shape-Shifting", "Amphibious", "Semi-Aquatic", "Heat-Resistant",  
    "Cold-Blooded", "Featherless", "Fur-Spotted", "Patterned Skin", "Color-Changing",  
    "Mimicry-Based Appearance", "Hollow-Boned", "Cartilage-Based", "Magneto-sensitive",  
    "Echolocation Capable", "Sonic Communication", "Antenna-Equipped", "Infrared Vision",  

    // Unique Abilities  
    "Telepathic", "Empathic", "Hive-Minded", "Psionic", "Reality-Bending",  
    "Superintelligent", "Hyper-Reflexive", "Regenerative", "Long-Lived", "Short-Lived",  
    "Energy-Absorbing", "Radioactive", "Sound-Wave Manipulating", "Magnetic Field-Control",  
    "Acidic Secretions", "Pheromone-Communicating", "Light-Absorbing", "Darkness-Dwelling",  
    "Chrono-Sensitive", "Gravity-Warping", "Subspace-Navigating", "Multi-Dimensional",  
    "Self-Cloning", "Bioelectricity-Generating", "Metamorphic", "Telekinetic",  
    "Antimatter-Resistant", "Neural-Link Capable", "Cyborg-Compatible", "Hibernation-Prone",  
    "Parasitic", "Symbiotic", "Photosynthetic-Sustained", "Deep-Space Adapted",  
    "Extreme Pressure Resistant", "Zero-Gravity-Oriented", "Toxin-Immune",  
    "Lava-Dwelling", "Extreme Cold Resistant", "Frozen-Land Specialist",  
    "Vibration-Based Communication", "Electrical Impulse Detection",  

    // Behavioral Traits  
    "Aggressive", "Docile", "Solitary", "Pack-Oriented", "Nomadic",  
    "Territorial", "Herd-Based", "Hive-Minded", "Matriarchal", "Patriarchal",  
    "Egalitarian", "Caste-Based", "Warrior Culture", "Peaceful Society", "Trade-Oriented",  
    "Carnivorous", "Herbivorous", "Omnivorous", "Mineral-Consuming", "Parasitic Feeder",  
    "Photosynthetic Feeder", "Scavenger", "Predatory", "Ambush-Oriented",  
    "Opportunistic Feeder", "Migratory", "Seasonally Active", "Hyperactive",  
    "Lazy", "Energy-Conserving", "Slow but Enduring", "Fast but Fragile",  
    "Communal Nesters", "Burrow-Dwelling", "Arboreal", "Aquatic Dwelling",  
    "Subterranean Society", "Underground Tunneler", "Aerial Predator",  
    "High-Speed Mover", "Climbing Specialist", "Deep-Sea Hunter",  
    "Cave Dweller", "Nocturnal Predator", "Diurnal Hunter",  

    // Social Traits  
    "Highly Cooperative", "Mistrustful", "Highly Ritualistic", "Spiritual",  
    "Warlike", "Highly Diplomatic", "Culturally Adaptive", "Rigid Tradition",  
    "Hierarchical", "Anarchic", "Collectivist", "Authoritarian", "Technophobic",  
    "Technophilic", "Exploration-Driven", "Expansionist", "Isolationist",  
    "Honor-Bound", "Survivalist", "Opportunistic", "Deceptive", "Brutally Honest",  
    "Sacrificial", "Self-Preservation Focused", "Martyr-Oriented",  
    "Culturally Resistant", "Culturally Absorptive", "Progressive", "Traditionalist",  
    "Competitive", "Socially Codependent", "Highly Expressive", "Emotionally Distant",  
    "Value Intelligence", "Value Strength", "Value Speed", "Value Art", "Value Science",  
    "Value Spirituality", "Value Innovation", "Value Stability", "Rebellious",  
    "Conformist", "Mercantile", "Hunter-Oriented", "Builder-Oriented", "Scavenger-Oriented",  

    // Psychological Traits  
    "Curious", "Cautious", "Fearless", "Nervous", "Highly Loyal", "Betrayal-Prone",  
    "Paranoid", "Carefree", "Hyper-Logical", "Deeply Intuitive", "Meditative",  
    "Aggressively Expansionist", "Dream-Oriented", "Hedonistic", "Survival-Obsessed",  
    "High-Risk Taker", "Emotionally Driven", "Highly Rational", "Stoic", "Explosive Temper",  
    "Easily Distracted", "Patient", "Vengeful", "Forgiving", "Manipulative",  
    "Loyal to Family", "Loyal to Ideals", "Loyal to Wealth", "Loyal to Power",  

    // Technological Affinities  
    "Primitive", "Advanced", "Post-Singularity", "AI-Integrated", "Genetic Engineers",  
    "Cybernetic Enhancements", "Self-Evolving", "Holographic Civilization",  
    "Matter-Manipulating", "Energy Being", "Quantum Computing Users",  
    "Interdimensional Travelers", "Nanobot-Based Society", "Zero-Gravity Adapted",  
    "Biomechanical Society", "Ancient Relic Keepers", "Lost Knowledge Seekers",  
    "Artificially Created Species", "Synthetic Lifeforms", "Tech-Distrusting",  

    // Miscellaneous & Surreal Traits  
    "Ethereal", "Gravity-Neutral", "Void-Born", "Cosmic Energy-Based",  
    "Time Perception Altered", "Exists in Multiple Timelines", "Dream-Linked",  
    "Memory-Shared Society", "Telepathic Architects", "Emotion-Absorbing",  
    "Energy Vampires", "Sound-Based Navigation", "Synesthetic Perception",  
    "Quantumly Split Beings", "Void-Touched", "Non-Corporeal",  
    "Permanently Phased Out of Reality", "Intergalactic Collective Consciousness",  
    "Fragmented Consciousness", "Light-Walking", "Shadows-Dwelling",  
    "Exist Only When Observed", "Formless Thought Beings", "Elder Knowledge Keepers",  
    "Mythologically Bound", "Planet-Sized Organisms",
  
    // Random (custom/manual)
    "Godlike", "Enslaved", "Domesticated", "Marginalized", "Endangered", "Handful Left",
    "Immortal"
];
let colors = [
    // Basic Colors  
    "Red", "Blue", "Yellow", "Green", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Gray",

    // Shades of Red  
    "Crimson", "Scarlet", "Ruby", "Cherry", "Burgundy", "Maroon", "Rose", "Garnet", "Rust", "Brick",  
    "Salmon", "Coral", "Blush", "Mahogany", "Mulberry", "Pomegranate", "Wine", "Blood Red", "Berry",  

    // Shades of Blue  
    "Navy", "Royal Blue", "Sky Blue", "Baby Blue", "Cobalt", "Cerulean", "Azure", "Sapphire", "Teal",  
    "Turquoise", "Denim", "Prussian Blue", "Steel Blue", "Powder Blue", "Ocean Blue", "Ice Blue",  
    "Electric Blue", "Indigo", "Midnight Blue", "Glacial Blue",  

    // Shades of Yellow  
    "Gold", "Mustard", "Amber", "Sunflower", "Lemon", "Butterscotch", "Honey", "Canary", "Daffodil",  
    "Flax", "Banana", "Corn", "Ochre", "Goldenrod", "Cream", "Sand", "Pale Yellow", "Saffron",  

    // Shades of Green  
    "Emerald", "Forest Green", "Olive", "Mint", "Jade", "Lime", "Moss", "Pine", "Sea Green",  
    "Sage", "Fern", "Shamrock", "Chartreuse", "Kelly Green", "Clover", "Neon Green",  
    "Dark Green", "Pistachio", "Cypress", "Basil",  

    // Shades of Orange  
    "Pumpkin", "Tangerine", "Clementine", "Carrot", "Persimmon", "Copper", "Apricot", "Peach",  
    "Fire", "Amber Glow", "Rust Orange", "Marmalade", "Bronze", "Saffron Orange", "Desert Orange",  

    // Shades of Purple  
    "Lavender", "Violet", "Amethyst", "Plum", "Orchid", "Lilac", "Mauve", "Wisteria", "Grape",  
    "Heather", "Eggplant", "Deep Purple", "Royal Purple", "Dark Violet", "Magenta", "Iris",  
    "Mulberry", "Tyrian Purple",  

    // Shades of Pink  
    "Hot Pink", "Bubblegum", "Carnation", "Fuchsia", "Blush Pink", "Rosewood", "Pastel Pink",  
    "Watermelon", "Coral Pink", "Salmon Pink", "Dusty Rose", "Cherry Blossom", "Peony",  
    "Rouge", "Ballet Pink", "Tea Rose",  

    // Shades of Brown  
    "Chocolate", "Coffee", "Mocha", "Caramel", "Walnut", "Chestnut", "Cinnamon", "Umber",  
    "Tawny", "Sepia", "Sandstone", "Mahogany", "Pecan", "Beige", "Taupe", "Sienna",  
    "Driftwood", "Hazel", "Burnt Umber",  

    // Shades of Black & Gray  
    "Jet Black", "Charcoal", "Onyx", "Obsidian", "Graphite", "Ash Gray", "Slate",  
    "Pewter", "Iron Gray", "Gunmetal", "Fog Gray", "Silver", "Lead", "Dove Gray",  
    "Platinum", "Shadow", "Smoke", "Anthracite", "Steel",  

    // Shades of White & Off-White  
    "Ivory", "Pearl", "Snow", "Alabaster", "Eggshell", "Cream", "Linen",  
    "Frost", "Chalk", "Seashell", "Vanilla", "Porcelain", "Pale Silver",  
    "White Smoke", "Moonstone", "Cotton",  

    // Metallic & Other Natural Colors  
    "Copper", "Gold", "Bronze", "Silver", "Pewter", "Platinum", "Rose Gold",  
    "Steel Blue", "Verdigris", "Brass", "Titanium", "Nickel", "Lead",  

    // Unusual & Specialty Colors  
    "Stormy Blue", "Arctic Blue", "Dusty Teal", "Sunset Orange", "Autumn Red",  
    "Evergreen", "Galaxy Purple", "Twilight Blue", "Deep Space Black", "Frosted Lavender",  
    "Moonlit Gray", "Coral Reef", "Sunset Gold", "Harvest Yellow", "Opal",  
    "Tundra White", "Oceanic Green", "Cosmic Indigo", "Glacial Silver",  
    "Solar Flare", "Dusk Violet", "Mystic Jade", "Celestial Blue"
];


function genPlanetName(){
  return makeName(planetNames, 8)
}
function genEnvironment(){
    return environments[environments.length*Math.random()|0]
}
function genPlanetType(){
  return planetTypes[planetTypes.length*Math.random()|0]
}
function genSpeciesName(){
  return makeName(speciesNames, 4)
}
function genCharacteristic(){
  return characteristics[characteristics.length*Math.random()|0]
}
function genColor(){
  return colors[colors.length*Math.random()]
}

export { genPlanetName, genEnvironment, genSpeciesName, genCharacteristic, genColor, genPlanetType }