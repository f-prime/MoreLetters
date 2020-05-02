export const originalState = {
  day: true,
  
  phase:0,
  phase1: 50,
  phase2: 10 ** 4,
  phase3: 500 * 10 ** 5,
  phase4: 10 ** 6,
  phase5: 10 ** 7,
  
  numChosen: 0,
  powerups: {},
  choosePowerups: false,

  lastTick: new Date(),
  delta: 0,

  pricePerLetter: 0.25,

  openLetter: false,
  read: false,
  readAmount: 25,
  readPhase: 4,
  decipherText: "",
  deciphered:false,
  totalLetters: 1,//5, 
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

  littleHelp: false,
  littleHelpChance:0.10,
  littleHelpIncrease: 100,
  littleHelpBasePrice: 20000,

  pigeons: 0,
  pigeonsDelivery: 1,
  pigeonsBasePrice: 50,
  pigeonsDelay: 150,

  breeders: 0,
  breederBreed: 1,
  breederBasePrice: 230,
  breederDelay: 500,

  corporateOffices: 0,
  corporateOfficesDelay: 750,
  corporateOfficesIncrease: 1,
  corporateOfficesBasePrice: 500, 

  advertisers: 0,
  advertisersDelay: 250,
  advertisersInc: 1,
  advertisersBasePrice: 100,

  clickInc: 1,
  bootstrap: 0,
  bootstrapBasePrice: 15,
  bootstrapDelivery: 50,

  twoHands: 0,
  twoHandsBasePrice: 300,
  twoHandsMult: 2,

  mailmen: 0,
  mailmanBasePrice: 10, 
  mailmanDelay: 750,
  mailmanDelivery: 1,

  mailboxBasePrice: 10,
  mailboxes: 0,
  mailboxLettersInc: 1,
  mailboxDelay: 500,

  factoryBasePrice: 150,
  factoryDelay: 500,
  factories: 0,
  factoryGenerate: 1,

  lastSave: new Date(),
};


export function saveState() {
  const now = new Date();
  if(now - new Date(this.lastSave) > 1000) {
    localStorage.setItem("state", JSON.stringify(this.$data));
    localStorage.setItem("lastSave", now);
    localStorage.setItem("day", this.day);
    localStorage.setItem("letter", this.letterOn);
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
  this.mailboxes += Math.floor((secondsSince / this.factoryDelay) * this.factories);
  this.money += Math.floor((secondsSince / this.mailmanDelay) * this.mailmen * this.pricePerLetter);
}

export function loadState() {
  const keysToLoad = [
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
    "decipherText",
    "deciphered",
    "letterOn",
    "corporateOffices",
    "advertisers",
  ];
  
  
  const day = localStorage.getItem("day");
  const letterOn = localStorage.getItem("letter");

  let state = localStorage.getItem("state");
  let json;

  if(!state)
    json = {};
  else
    json = JSON.parse(state);

  for(const key in json) {
    if(keysToLoad.indexOf(key) === -1) {
      continue;
    }

    this.$data[key] = json[key];
  } 
  
  if(day) {
    this.day = JSON.parse(day); 
  }

  if(letterOn && Number(letterOn)) {
    this.letterOn = Number(letterOn);
  } else {
    this.letterOn = 0;
  }

  this.calculateNewState();
}

export function newGame() {
  localStorage.removeItem("state");
  window.location.reload();
}
