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
  phase10: 10 ** 11,
  phase11: 10 ** 12,
  // 12 is a read
  phase13: 10 ** 13,
  phase14: 10 ** 14,
  // 15 is a read
  phase16: 10 ** 16,
  phase17: 10 ** 17,
  // 18 is a read
  phase19: 10 ** 19,
  phase20: 10 ** 20,
  // 21 is a read
  numChosen: 0,
  powerups: {},
  choosePowerups: false,

  lastTick: new Date(),
  delta: 0,

  pricePerLetter: 0.25,

  clickInc: 1,

  openLetter: false,
  read: false,
  readLetters:0,
  curiosity: 0,
  
  lastPhase: 21,
  letterPhases: [8, 11, 14, 17, 20], // One less than read phase number 
  letter: "",

  autoreaderInc: 1,
  autoreader: 0,
  autoreaderBasePrice: 10,

  money: 0,

  breeders: 0,
  breederDelay: 1500,
  breederPigeonInc: 10,
  breederLast: 0,
  breederBasePrice: 10 ** 11,

  geneticEngineering: false,
  geneticEngineeringBasePrice: 50 ** 11,

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
  littleHelpChance:0.30,
  littleHelpBasePrice: 20000,

  postOffices: 0,
  postOfficeDelay: 350,
  postOfficeInc: 2,
  postOfficeBasePrice: 2000,
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
  corporateOfficesDelay: 2000,
  corporateOfficesIncrease: 1,
  corporateOfficesBasePrice: 50000000000, 

  adsBasePrice: 10 ** 9,
  adsLettersInc: 500000,

  email: false,
  emailInc: 10,
  emailDelay: 100,
  emailLast: 0,
  emailBasePrice: 10 ** 9,

  selfReliance: false,
  selfRelianceBasePrice: 10 ** 10,
  selfRelianceInc: 1000,

  mailware: false,
  mailwareBasePrice: 11 ** 9,
  mailwareInc: 2,
  mailwareLast:0,
  mailwareDelay:0,

  bigNet: false,
  bigNetInc: 20,
  bigNetBasePrice: 3000000,
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
  caffeineBasePrice: 100000,
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
    "read",
    "lettersDelivered",
    "letter",
    "numChosen",
    "curiosity",
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
    "mailDrones",
    "mailboxes",
    "recruiters",
    "factories",
    "segway",
    "mailTrucks",
    "caffeine",
    "scientificManagement",
    "corporateOffices",
  ];
  
  
  const day = localStorage.getItem("day");
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

  this.calculateNewState();
}

export function newGame() {
  localStorage.removeItem("state");
  window.location.reload();
}
