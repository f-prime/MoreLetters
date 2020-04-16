export const originalState = {
  day: true,
  
  phase:0,

  phase1: 40,
  phase2: 10000,
  phase3: 100000,
  phase4: 500000,
  phase5: 1000000,
  phase6: 5000000,
  phase7: 1000000000,

  phaseType: {},

  isActiveBootstrap: 10,
  isActiveClick: 100,

  lastTick: new Date(),
  delta: 0,

  pricePerLetter: 0.25,

  clickDelivery: 0,
  clickInc: 1,

  money: 1000000000000,

  lettersInc: 1,
  lettersDelay: 1000,
  letters: 0,
  lettersDelivered: 10000000000,
  lettersLast: 0,

  littleHelp: false,
  littleHelpChance:0.30,
  littleHelpBasePrice: 200000,

  postOffices: 0,
  postOfficeDelay: 500,
  postOfficeInc: 2,
  postOfficeBasePrice: 50000,
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
  emailBasePrice: 200000000,

  selfReliance: false,
  selfRelianceBasePrice: 10 ** 9,
  selfRelianceInc: 300,

  mailware: false,
  mailwareBasePrice: 10 ** 11,
  mailwareInc: 2,
  mailwareLast:0,
  mailwareDelay:0,

  bigNet: false,
  bigNetInc: 20,
  bigNetBasePrice: 300000000,
  bigNetLast:0,
  bigNetDelay:300,
  
  spontaneousGeneration: false,
  spontaneousGenerationBasePrice: 100000000,
  spontaneousGenerationChance: 0.30,
  spontaneousGenerationMult: 4,
  
  bootstrap: 0,
  bootstrapBasePrice: 25,
  bootstrapDelivery: 1,

  mailmen: 0,
  mailmanBasePrice: 10, 
  mailmanDelay: 500,
  mailmanLast: 0,
  mailmanDelivery: 1,

  mailboxBasePrice: 10,
  mailboxes: 0,
  mailboxLettersIncrease: 1,

  recruiterHire: 1,
  recruiterLast: 0,
  recruiterBasePrice: 1000,
  recruiterDelay: 3500,
  recruiters: 0,

  factoryBasePrice: 1500,
  factoryDelay: 5000,
  factories: 0,
  factoryGenerate: 1,
  factoryLast: 0,

  segwayBasePrice: 5000,
  segways: 0,
  segwayMailmanBoost: 0.025,

  mailTrucks: 0,
  mailTruckDelay: 500,
  mailTruckBasePrice:40000,
  mailTruckInc: 2,

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
