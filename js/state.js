export const originalState = {
  phase:0,

  lettersInc: 1,
  lettersDelay: 1000,
  letters: 0,
  lettersDelivered: 0,
  lastLettersUpdate: new Date(),
 
  mailmen: 0,
  mailmanBasePrice: 10, 
  lastMailmanDelivery: new Date(),
  mailmanDeliveryDelay: 500,

  mailboxBasePrice: 10,
  mailboxes: 0,

  pricePerLetter: 0.25,
  money: 0,

  recruiterBasePrice: 1000,
  recruiterHireDelay: 1000,
  lastRecruiterHire: new Date(),
  recruiters: 0,

  factoryBasePrice: 1500,
  factoryDelay: 2000,
  lastFactory: new Date(),
  factories: 0,

  segwayBasePrice: 5000,
  segways: 0,

  scientificManagementBasePrice: 10000000,
  scientificManagement: false,

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
  this.mailmen += Math.floor((secondsSince / this.recruiterHireDelay) * this.recruiters * this.multiplier);
  this.mailboxes += Math.floor((secondsSince / this.factoryDelay) * this.factories * this.multiplier);
  this.money += Math.floor((secondsSince / this.mailmanDeliveryDelay) * this.mailmen * this.pricePerLetter * this.multiplier);

}

export function loadState() {
  const state = localStorage.getItem("state");
  if(!state)
    return;

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
