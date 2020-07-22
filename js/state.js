export const originalState = {
  day: true,

  phase:0,
  phase1: 0,
  phase2: 10000,
  phase3: 2000000,
  phase4: 100000000,
  
  numChosen: 0,
  powerups: {},
  choosePowerups: true,
 
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
  correspondencePage: false,
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

  tisSaidMult: 2,
  leeleePinkeyInc: 500,
  codeBreakerDelay: 100,
  hackerLPS: 1000,

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

  letterMapping: {
    "ABDEGH": {
      title:"Tis Said",
      unlocked: false,
    },

    "BCEFGH": {
      title: "Lee Lee's Pinky",
      unlocked: false,
    },

    "ABDEHI": {
      title: "Turing",
      unlocked: false
    },
    
    "ABDEGI": {
      title: "The Mentor",
      unlocked: false
    },
    "ABEFGH": {
      title: "Ward",
      unlocked: false
    },
    "ABEFHI": {
      title: "Prison Stories",
      unlocked: false
    },
    "ABEFGI": {
      title: "Brainfuck",
      unlocked: false
    },
    "ABDFGH": {
      title: "Alice",
      unlocked: false
    },
    "ABDFHI": {
      title: "Worms",
      unlocked: false
    },
    "ABDFGI": {
      title: "Aroma",
      unlocked: false
    },
    "BCDEGH": {
      title: "Halloween",
      unlocked: false
    },
    "BCDEHI": {
      title: "Whitespace",
      unlocked: false
    },
    "BCDEGI": {
      title: "Remainder",
      unlocked: false
    },
    "BCEFHI": {
      title: "Chameleon",
      unlocked: false
    },
    "BCEFGI": {
      title: "No Substitution",
      unlocked: false
    },
    "BCDFGH": {
      title: "Like a Bird",
      unlocked: false
    },
    "BCDFHI": {
      title: "Self-Conscious",
      unlocked: false
    },
    "BCDFGI": {
      title: "Failure",
      unlocked: false
    },
    "ACDEGH": {
      title: "Cancer",
      unlocked: false,
    },
    "ACDEHI": {
      title: "Upside Down",
      unlocked: false
    },
    "ACDEGI": {
      title: "Two Words",
      unlocked: false
    },
    "ACEFGH": {
      title: "Simple Addition",
      unlocked: false
    },
    "ACEFHI": {
      title: "Scrambled Addition",
      unlocked: false
    },
    "ACEFGI": {
      title: "Ancient",
      unlocked: false
    },
    "ACDFGH": {
      title: "Creativity",
      unlocked: false
    },
    "ACDFHI": {
      title: "Riddle",
      unlocked: false
    },
    "ACDFGI": {
      title: "Another Riddle",
      unlocked: false
    }
  },

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
  advertisersDelay: 1200,
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
    "correspondencePage",
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
