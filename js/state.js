export const originalState = {
  phase:0,

  phase0: 40,
  phase1: 10000,
  phase2: 100000,

  lastTick: new Date(),
  delta: 0,

  clickDelivery: 0,
  clickInc: 1,

  lettersInc: 1,
  lettersDelay: 1000,
  letters: 0,
  lettersDelivered: 0,
  lettersLast: 0,
 
  bootstrap: 0,
  bootstrapBasePrice: 50,

  mailmen: 0,
  mailmanBasePrice: 10, 
  mailmanDelay: 500,
  mailmanLast: 0,

  mailboxBasePrice: 10,
  mailboxes: 0,

  pricePerLetter: 0.25,
  money: 0,

  recruiterBasePrice: 1000,
  recruiterDelay: 2000,
  recruiters: 0,

  factoryBasePrice: 1500,
  factoryDelay: 3000,
  factories: 0,

  segwayBasePrice: 5000,
  segways: 0,

  scientificManagementBasePrice: 10000000,
  scientificManagement: false,

  angryDogs: 0,
  angryDogDelay: 30000,
  dogsPerTick:1,
  angryDogEfficiencyHit: 20,

  dogTreats: 0,
  dogTreatsBasePrice: 1,
  dogTreatsDecrement: 1,
  
  lastSave: new Date(),
};


export function saveState() {
  const now = new Date();
  if(now - new Date(this.lastSave) > 1000) {
    localStorage.setItem("state", JSON.stringify(this.$data));
    localStorage.setItem("lastSave", now);
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
  const state = localStorage.getItem("state");
  if(!state)
    return;
  
  console.log(state);
  const json = JSON.parse(state);
  
  for(const key in json) {
    this.$data[key] = json[key];
  } 

  this.calculateNewState();
}

export function newGame() {
  localStorage.removeItem("state");
  window.location.reload();
}
