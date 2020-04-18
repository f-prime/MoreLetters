export const originalState = {
  day: true,
  
  phase:0,

  phase1: 50,
  phase2: 10000,
  phase3: 100000,
  phase4: 1000000,
  phase5: 10000000,
  phase6: 100000000,
  phase7: 1000000000,
  phase8: 10000000000,

  phaseType: {},

  isActiveBootstrap: 10,
  isActiveClick: 100,

  lastTick: new Date(),
  delta: 0,

  pricePerLetter: 0.25,

  clickDelivery: 0,
  clickInc: 1,

  read: false,
  readLetters:0,
  curiosity: 0,
  
  autoreaderInc: 1,
  autoreader: 0,
  autoreaderBasePrice: 10,

  money: 0,

  lettersInc: 1,
  lettersDelay: 1000,
  letters: 0,
  lettersDelivered: 0,
  lettersLast: 0,

  littleHelp: false,
  littleHelpChance:0.30,
  littleHelpBasePrice: 20000,

  postOffices: 0,
  postOfficeDelay: 500,
  postOfficeInc: 2,
  postOfficeBasePrice: 1500,
  postOfficeLast:0,

  twoForOne: false,
  twoForOneBasePrice: 10000,

  twoHands: false,
  twoHandsMultiplier: 2,
  twoHandsBasePrice: 3000,
  twoHandsChance: 0.3,

  inflation: false,
  inflationBasePrice: 500000000,
  inflationIncrease: 1,

  email: false,
  emailInc: 10,
  emailDelay: 100,
  emailLast: 0,
  emailBasePrice: 1000000,

  selfReliance: false,
  selfRelianceBasePrice: 10 ** 9,
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
  jetDelivery: 10,
  jetDelay: 500,
  jetLast: 0,
  jetBasePrice: 500000, 

  spontaneousGeneration: false,
  spontaneousGenerationBasePrice: 100000000,
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
  mailboxLettersIncrease: 1,
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
  segways: 0,
  segwayMailmanBoost: 0.025,

  mailTrucks: 0,
  mailTruckDelay: 500,
  mailTruckBasePrice:1000,
  mailTruckInc: 2,

  caffeine: false,
  caffeineBasePrice: 100000,
  caffeineBoost: 0.3,

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
  const day = localStorage.getItem("day");
  let state = localStorage.getItem("state");
  let json;

  if(!state)
    json = {};
  else
    json = JSON.parse(state);

  for(const key in json) {
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
