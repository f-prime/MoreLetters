export const originalState = {
  day: true,

  phase:0,
  phase1: 50,
  phase2: 10000,
  phase3: 2000000,
  phase4: 100000000,
  
  numChosen: 0,
  powerups: {},
  choosePowerups: false,
  
  pathOpened: "",
  path:"",

  pathMap: {
    "Mailman":"A",
    "Mailbox":"B",
    "Bootstrap":"C",
    "Pigeons":"D",
    "Factory":"E",
    "Advertisers":"F",
    "Corporate Offices":"G",
    "Two Hands":"H",
    "Breeder":"I"
  },

  correspondence: false,

  lastTick: new Date(),
  delta: 0,

  pricePerLetter: 0.25,

  openLetter: false,
  read: false,
  readPhase: 4,
  correspondenceDecipherText:"", 
  decipherText: "",
  deciphered:false,
  letter: "",
  plaintext:"",

  money: 0,

  lettersPs: 0,
  prevLettersPs: 0,
  lastLettersPs: 0,

  deliveryPs: 0,
  prevDeliveryPs: 0,
  lastDeliveryPs: 0,

  lettersInc: 1,
  lettersDelay: 1000,
  letters: 0,
  lettersDelivered: 0,

  pigeons: 0,
  pigeonsDelivery: 1,
  pigeonsBasePrice: 50,
  pigeonsDelay: 300,

  breeders: 0,
  breederBreed: 3,
  breederBasePrice: 190,
  breederDelay: 500,

  corporateOffices: 0,
  corporateOfficesDelay: 750,
  corporateOfficesIncrease: 1,
  corporateOfficesBasePrice: 300, 
  corporateOfficeAdded: 0,

  advertisers: 0,
  advertisersDelay: 250,
  advertisersInc: 1,
  advertisersBasePrice: 100,

  clickInc: 1,
  bootstrap: 0,
  bootstrapBasePrice: 15,
  bootstrapDelivery: 25,

  twoHands: 0,
  twoHandsBasePrice: 500,
  twoHandsMult: 2,

  mailmen: 0,
  mailmanBasePrice: 10, 
  mailmanDelay: 150,
  mailmanDelivery: 1,

  mailboxBasePrice: 10,
  mailboxes: 0,
  mailboxLettersInc: 1,
  mailboxDelay: 500,

  factoryBasePrice: 150,
  factoryDelay: 2000,
  factories: 0,
  factoryMailboxes: 0,
  factoryGenerate: 1,

  lastSave: new Date(),

  lettersTexts: {},  
  letterMapping: {
    "ABDEGH": {
      title:"Tis Said",
      powerup: "Mule",
      description: "Mailmen now deliver 100 letters every tick.",
      unlocked: false,
    },

    "BCEFGH": {
      title: "The Doll",
      powerup: "LeeLee's Pinky",
      description: "Bootstrap increment increased by 1000.",
      unlocked: false,
    },

    "ABDEHI": {
      title: "Turing",
      powerup: "Code Breaker",
      description: "",
      unlocked: false
    },
    
    "ABDEGI": {
      title: "The Mentor",
      powerup: "Hacker",
      description: "Does something...",
      unlocked: false
    },
    "ABEFGH": {
      title: "Ward",
      powerup: "Insanity",
      description: "",
      unlocked: false
    },
    "ABEFHI": {
      title: "Prison Stories",
      powerup: "Empowerment",
      description: "",
      unlocked: false
    },
    "ABEFGI": {
      title: "Esoteric",
      powerup: "Brainfuck",
      description: "",
      unlocked: false
    },
    "ABDFGH": {
      title: "Alice",
      powerup: "",
      description: "",
      unlocked: false
    },
    "ABDFHI": {
      title: "Worms",
      powerup: "Worms",
      description: "",
      unlocked: false
    },
    "ABDFGI": {
      title: "Aroma",
      powerup: "",
      description: "",
      unlocked: false
    },
    "BCDEGH": {
      title: "Halloween",
      powerup: "",
      description: "",
      unlocked: false
    },
    "BCDEHI": {
      title: "Whitespace",
      powerup: "",
      description: "",
      unlocked: false
    },
    "BCDEGI": {
      title: "Remainder",
      powerup: "",
      description: "",
      unlocked: false
    },
    "BCEFHI": {
      title: "Chameleon",
      powerup: "",
      description: "",
      unlocked: false
    },
    "BCEFGI": {
      title: "No Substitution",
      powerup: "",
      description: "",
      unlocked: false
    },
    "BCDFGH": {
      title: "Like a Bird",
      powerup: "",
      description: "",
      unlocked: false
    },
    "BCDFHI": {
      title: "Self-Conscious",
      powerup: "",
      description: "",
      unlocked: false
    },
    "BCDFGI": {
      title: "Failure",
      powerup: "",
      description: "",
      unlocked: false
    },
    "ACDEGH": {
      title: "Cancer",
      powerup: "Cancer",
      description: "At every new phase, a random powerup will be automatically be incremented every 0.5 seconds. The powerup does not cost money.",
      unlocked: false
    },
    "ACDEHI": {
      title: "Upside Down",
      powerup: "",
      description: "",
      unlocked: false
    },
    "ACDEGI": {
      title: "Two Words",
      powerup: "",
      description: "",
      unlocked: false
    },
    "ACEFGH": {
      title: "Simple Addition",
      powerup: "",
      description: "",
      unlocked: false
    },
    "ACEFHI": {
      title: "Scrambled Addition",
      powerup: "",
      description: "",
      unlocked: false
    },
    "ACEFGI": {
      title: "Ancient",
      powerup: "",
      description: "",
      unlocked: false
    },
    "ACDFGH": {
      title: "Gratitude",
      powerup: "",
      description: "",
      unlocked: false
    },
    "ACDFHI": {
      title: "Riddle",
      powerup: "",
      description: "",
      unlocked: false
    },
    "ACDFGI": {
      title: "Another Riddle",
      powerup: "",
      description: "",
      unlocked: false
    }
  },
};


export function saveState(force) {
  const now = new Date();
  if(now - new Date(this.lastSave) > 1000 || force) {
    localStorage.setItem("state", JSON.stringify(this.$data));
    this.lastSave = now;
  }
}

export function calculateNewState() {
  const lastSave = this.lastSave;

  const now = new Date();
  const lastSaveTime = new Date(lastSave);
  const secondsSince = now - lastSaveTime;

  this.letters += Math.floor((secondsSince / this.lettersDelay));
  this.money += Math.floor((secondsSince / this.mailmanDelay) * this.mailmen * this.pricePerLetter); 
  this.money += Math.floor((secondsSince / this.pigeonsDelay) * this.pigeons * this.pricePerLetter);
  this.factoryAdded += Math.floor((secondsSince / this.factoryDelay) * this.factories);
  this.clickInc += Math.floor((secondsSince / this.advertisersDelay) * this.advertisers * this.advertisersInc);
  this.pigeons += Math.floor((secondsSince / this.breederDelay) * this.breeders);
  this.corporateOfficeAdded += Math.floor((secondsSince / this.corporateOfficesDelay) * this.corporateOffices);
}

export function loadState() {
  const keysToLoad = [
    "pathOpened",
    "path",
    "mailmen",
    "phase",
    "day",
    "powerups",
    "choosePowerups",
    "openLetter",
    "curiosity",
    "twoHands",
    "read",
    "lettersTexts",
    "correspondence",
    "lettersDelivered",
    "letter",
    "plaintext",
    "numChosen",
    "pigeons",
    "autoreader",
    "money",
    "breeders",
    "letters",
    "bootstrap",
    "clickInc",
    "mailboxes",
    "factories",
    "factoryMailboxes",
    "decipherText",
    "correspondenceDecipherText",
    "deciphered",
    "corporateOffices",
    "corporateOfficeAdded",
    "advertisers",
  ];
  
  let state = localStorage.getItem("state");
  let json;

  if(!state)
    json = {};
  else
    json = JSON.parse(state);

  for(const key in json) {
    const keyVal = json[key];
    if(keysToLoad.indexOf(key) === -1 || keyVal == null || keyVal == undefined) {
      continue;
    }
  
    this.$data[key] = keyVal;
  } 
 
  // Load powerup unlocked states
  
  const letterMapping = json.letterMapping;
  
  for(const key in letterMapping) {
    this.$data.letterMapping[key].unlocked = letterMapping[key].unlocked;
  }

  this.calculateNewState();
}

export function newGame() { 
  localStorage.removeItem("state");

  const newState = {
    lettersTexts:this.lettersTexts,
    letterMapping: this.letterMapping,
    day:this.day,
    correspondence:this.correspondence,
  };

  localStorage.setItem("state", JSON.stringify(newState));

  window.location = '/';
}
