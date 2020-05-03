export const originalState = {
  day: true,
  
  phase:0,
  phase1: 50,
  phase2: 10000,
  phase3: 2000000,
  phase4: 30000000,
  
  numChosen: 0,
  powerups: {},
  choosePowerups: false,

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
  
  lettersTexts: {},
  letterPowerupStates: { // 0 is locked, 1 has letter but not deciphered, 2 is deciphered and has powerup
    "Muel":0,
    "LeeLee's Pinkey":0,
  },

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
  breederBreed: 1,
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
  bootstrapDelivery: 50,

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
  factoryDelay: 750,
  factories: 0,
  factoryMailboxes: 0,
  factoryGenerate: 1,

  lastSave: new Date(),
};


export function saveState() {
  const now = new Date();
  if(now - new Date(this.lastSave) > 1000) {
    localStorage.setItem("state", JSON.stringify(this.$data));
    localStorage.setItem("lastSave", now);
    localStorage.setItem("day", this.day);
    localStorage.setItem("lettersTexts", JSON.stringify(this.lettersTexts));
    localStorage.setItem("letterPowerupStates", JSON.stringify(this.letterPowerupStates));
    if(this.correspondence) {
      localStorage.setItem("correspondence", true);
    }
    this.lastSave = now;
  }
}

export function calculateNewState() {
  const lastSave = localStorage.getItem("lastSave");
  if(!lastSave)
    return;

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
  
  
  const day = localStorage.getItem("day");
  const correspondence = localStorage.getItem("correspondence");
  const letterPowerupStates = localStorage.getItem("letterPowerupStates");
  const lettersTexts = localStorage.getItem("lettersTexts");

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
  
  if(day) {
    this.day = JSON.parse(day); 
  }

  if(correspondence) {
    this.correspondence = true;
  } 

  if(letterPowerupStates) {
    this.letterPowerupStates = JSON.parse(letterPowerupStates);
  }

  if(lettersTexts) {
    this.lettersTexts = JSON.parse(lettersTexts);
  }

  this.calculateNewState();
}

export function newGame() {
  localStorage.removeItem("state");
  window.location = '/';
}
