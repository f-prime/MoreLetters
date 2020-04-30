export const originalState = {
  day: true,
  
  phase:0,

  // Phase numbers are upper bound to reach that phase

  phase1: 50,
  phase2: 10 ** 4,
  phase3: 10 ** 5,
  phase4: 10 ** 7,
  phase5: 10 ** 7,
  phase6: 10 ** 8,
  phase7: 10 ** 9,
  phase8: 10 ** 10,
  // 9 is a read
  phase10: 500 * 10 ** 11,
  
  numChosen: 0,
  powerups: {},
  choosePowerups: false,

  lastTick: new Date(),
  delta: 0,

  pricePerLetter: 0.25,

  openLetter: false,
  read: false,
  readLetters:0,
  curiosity: 0,
  
  letterOn:0,
  letter: "",

  autoreaderInc: 1,
  autoreader: 0,
  autoreaderBasePrice: 10,

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

  postOffices: 0,
  postOfficeDelay: 350,
  postOfficeInc: 20,
  postOfficeBasePrice: 2700,

  pigeons: 0,
  pigeonsDelivery: 1,
  pigeonsBasePrice: 1000,
  pigeonsDelay: 150,

  breeders: 0,
  breederBreed: 1,
  breederBasePrice: 50000,
  breederDelay: 500,

  corporateOffices: 0,
  corporateOfficesDelay: 1000,
  corporateOfficesIncrease: 1,
  corporateOfficesBasePrice: 50000000000, 

  advertisers: 0,
  advertisersDelay: 500,
  advertisersInc: 1,
  advertisersBasePrice: 3000,

  monopoly:0,
  monopolyBasePrice: 10 ** 11,
  monopolyDelay: 500,
  monopolyIncrease: 1,

  clickInc: 1,
  bootstrap: 0,
  bootstrapBasePrice: 15,
  bootstrapDelivery: 2,

  mailmen: 0,
  mailmanBasePrice: 10, 
  mailmanDelay: 750,
  mailmanDelivery: 1,

  mailboxBasePrice: 10,
  mailboxes: 0,
  mailboxLettersInc: 1,
  mailboxDelay: 500,

  recruiterHire: 1,
  recruiterBasePrice: 15000,
  recruiterDelay: 750,
  recruiters: 0,

  factoryBasePrice: 2000,
  factoryDelay: 2000,
  factories: 0,
  factoryGenerate: 1,

  mailTrucks: 0,
  mailTruckDelay: 250,
  mailTruckBasePrice:2200,
  mailTruckInc: 2,

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
  this.mailmen += Math.floor((secondsSince / this.recruiterDelay) * this.recruiters * this.multiplier);
  this.mailboxes += Math.floor((secondsSince / this.factoryDelay) * this.factories * this.multiplier);
  this.money += Math.floor((secondsSince / this.mailmanDelay) * this.mailmen * this.pricePerLetter * this.multiplier);
}

export function loadState() {
  const keysToLoad = [
    "mailmen",
    "phase",
    "day",
    "powerups",
    "choosePowerups",
    "openLetter",
    "readLetters",
    "curiosity",
    "read",
    "lettersDelivered",
    "letter",
    "numChosen",
    "pigeons",
    "autoreader",
    "money",
    "breeders",
    "letters",
    "postOffices",
    "bootstrap",
    "clickInc",
    "mailboxes",
    "recruiters",
    "factories",
    "mailTrucks",
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
