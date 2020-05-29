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
  correspondencePage: false,
  chooseCorrespondencePowerup: false, 
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
  letterMapping: {
    "ABDEGH": {
      title:"Tis Said",
      powerup: "Mule",
      description: "Reduces mailbox tick by 75%",
      unlocked: true,
    },

    "BCEFGH": {
      title: "A Peek Inside",
      powerup: "LeeLee's Pinky",
      description: "Bootstrap interval multiplied by 4.",
      unlocked: true,
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
      description: "Increases base letters per second from 1 to 100.",
      unlocked: true
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
      description: "Start each phase with 5 advertisers.",
      unlocked: true
    },
    "ABEFGI": {
      title: "Brainfuck",
      powerup: "Brainfuck",
      description: "",
      unlocked: false
    },
    "ABDFGH": {
      title: "Alice",
      powerup: "Leisure",
      description: "Double number of letters required per phase.",
      unlocked: true
    },
    "ABDFHI": {
      title: "Worms",
      powerup: "Worms",
      description: "Quadruples the price per letter at every phase.",
      unlocked: true
    },
    "ABDFGI": {
      title: "Aroma",
      powerup: "Industrial",
      description: "Start with one factory at every phase.",
      unlocked: true
    },
    "BCDEGH": {
      title: "Halloween",
      powerup: "Night Shift",
      description: "Start each phase with 50 mailmen.",
      unlocked: true
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
      powerup: "Surplus",
      description: "Start each phase with 50 mailboxes.",
      unlocked: true
    },
    "BCDFGH": {
      title: "Like a Bird",
      powerup: "Bird Feeder",
      description: "Start each phase with 200 pigeons.",
      unlocked: true
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
      unlocked: true,
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
      powerup: "Sun",
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
      title: "Creativity",
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
    "chooseCorrespondencePowerup"
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
    //letterMapping: this.letterMapping UNCOMMENT THIS ITS ONLY FOR DEBUGGING!!
    day:this.day,
    correspondence:this.correspondence,
    chooseCorrespondencePowerup:this.correspondence ? true : false
  };

  localStorage.setItem("state", JSON.stringify(newState));

  window.location = '/';
}
