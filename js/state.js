export const originalState = {
  day: true,
  
  phase:0,

  // Phase numbers are upper bound to reach that phase

  phase1: 50,
  phase2: 10 ** 4,
  phase3: 10 ** 5,
  phase4: 10 ** 6,
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
  lettersLast: 0,

  littleHelp: false,
  littleHelpChance:0.10,
  littleHelpIncrease: 100,
  littleHelpBasePrice: 20000,

  postOffices: 0,
  postOfficeDelay: 350,
  postOfficeInc: 20,
  postOfficeBasePrice: 2700,
  postOfficeLast:0,

  pigeons: 0,
  pigeonsLast: 0,
  pigeonsDelivery: 1,
  pigeonsBasePrice: 1000,
  pigeonsDelay: 600,

  dogTreats: false,
  dogTreatsBoost: 0.1,
  dogTreatsBasePrice: 1300,

  boxMod: false,
  boxModBoost: 1,
  boxModBasePrice: 1700,

  twoForOne: false,
  twoForOneBasePrice: 10000,

  twoHands: false,
  twoHandsMultiplier: 2,
  twoHandsBasePrice: 3000,
  twoHandsChance: 0.3,

  inflation: false,
  inflationBasePrice: 50000000,
  inflationIncrease: 1,

  corporateOffices: 0,
  corporateOfficesLast:0,
  corporateOfficesDelay: 1000,
  corporateOfficesIncrease: 1,
  corporateOfficesBasePrice: 50000000000, 

  adsBasePrice: 10 ** 9,
  adsLettersInc: 5000000,

  email: false,
  emailInc: 10,
  emailDelay: 100,
  emailLast: 0,
  emailBasePrice: 80 * 10 ** 7,

  selfReliance: false,
  selfRelianceBasePrice: 10 ** 10,
  selfRelianceInc: 1000,

  mailware: false,
  mailwareBasePrice: 11 ** 9,
  mailwareInc: 2,
  mailwareLast:0,
  mailwareDelay:0,

  bigNet: false,
  bigNetInc: 100,
  bigNetBasePrice: 10 ** 8,
  bigNetLast:0,
  bigNetDelay:300,
 
  jets: 0,
  jetDelivery: 25,
  jetDelay: 250,
  jetLast: 0,
  jetBasePrice: 500000, 

  spontaneousGeneration: false,
  spontaneousGenerationBasePrice: 300000,
  spontaneousGenerationChance: 0.30,
  spontaneousGenerationMult: 25,
  
  clickInc: 1,
  bootstrap: 0,
  bootstrapBasePrice: 25,
  bootstrapDelivery: 1,

  mailDrones: false,
  mailDronesDelay: 50,
  mailDronesDelivery: 20,
  mailDronesBasePrice: 10 ** 9,
  mailDronesLast: 0,

  mailmen: 0,
  mailmanBasePrice: 10, 
  mailmanDelay: 750,
  mailmanLast: 0,
  mailmanDelivery: 1,

  mailboxBasePrice: 10,
  mailboxes: 0,
  mailboxLettersInc: 1,
  mailboxDelay: 500,
  mailboxLast: 0,

  recruiterHire: 1,
  recruiterLast: 0,
  recruiterBasePrice: 50000,
  recruiterDelay: 2000,
  recruiters: 0,

  factoryBasePrice: 50000,
  factoryDelay: 3500,
  factories: 0,
  factoryGenerate: 1,
  factoryLast: 0,

  segwayBasePrice: 5000,
  segway: false,
  segwayMailmanBoost: 0.08,

  mailTrucks: 0,
  mailTruckDelay: 250,
  mailTruckBasePrice:2200,
  mailTruckInc: 2,

  caffeine: false,
  caffeineBasePrice: 1000000,
  caffeineBoost: 0.15,

  scientificManagementBasePrice: 100000,
  scientificManagement: false,

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
    "dogTreats",
    "boxMod",
    "autoreader",
    "money",
    "letters",
    "littleHelp",
    "postOffices",
    "twoForOne",
    "twoHands",
    "inflation",
    "email",
    "selfReliance",
    "mailware",
    "bigNet",
    "jets",
    "spontaneousGeneration",
    "bootstrap",
    "clickInc",
    "mailDrones",
    "mailboxes",
    "recruiters",
    "factories",
    "segway",
    "mailTrucks",
    "letterOn",
    "caffeine",
    "scientificManagement",
    "corporateOffices",
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
