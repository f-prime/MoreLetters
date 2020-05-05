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
      powerup: "Hacker",
      description: "Letters per second increased to 1000.",
      unlocked: false
    },
    
    "ABDEGI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ABEFGH": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ABEFHI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ABEFGI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ABDFGH": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ABDFHI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ABDFGI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "BCDEGH": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "BCDEHI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "BCDEGI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "BCEFHI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "BCEFGI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "BCDFGH": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "BCDFHI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "BCDFGI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ACDEGH": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ACDEHI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ACDEGI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ACEFGH": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ACEFHI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ACEFGI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ACDFGH": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ACDFHI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
    },
    "ACDFGI": {
      "title": "",
      "powerup": "",
      "description": "",
      "unlocked": false
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
    "letterMapping",
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
