export const originalState = {
  phase:1,

  multiplier: 1,
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

  lastSave: new Date(),
};


export function saveState() {
  const now = new Date();
  if(now - new Date(this.lastSave) > 1000) {
    localStorage.setItem("state", JSON.stringify(this.$data));
    this.lastSave = now;
  }
}

export function loadState() {
  const state = localStorage.getItem("state");
  if(!state)
    return;

  const json = JSON.parse(state);
  
  for(const key in json) {
    this.$data[key] = json[key];
  } 
}

export function newGame() {
  localStorage.removeItem("state");
  window.location.reload();
}
