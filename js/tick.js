export function generalUpdate(last, delay) {
  if(this._data[last] < delay) {
    this._data[last] += this.delta;
    return false;
  }

  this._data[last] = 0;
  return true;
}

export function updateLetters() {
  if(this.generalUpdate("lettersLast", this.lettersDelay)) {
    this.letters += ((this.lettersInc * (this.mailboxes + 1)) * this.multiplier );
  }
}

export function updateBigNet() {
  if(!this.bigNet)
    return;
  
  if(this.generalUpdate("bigNetLast", this.bigNetDelay)) {
    this.letters += this.bigNetInc * this.multiplier;
  }
}

export function updateMailDrones() {
  if(!this.mailDrones)
    return;

  if(this.generalUpdate("mailDronesLast", this.mailDronesDelay)) {
    this.deliverLetter(this.mailDronesDelivery * this.multiplier);
  }
}

export function updateMailware() {
  if(!this.mailware)
    return;

  if(this.generalUpdate("mailwareLast", this.mailwareDelay)) {
    this.letters += this.mailwareInc * this.multiplier;
  }
}

export function updateEmail() {
  if(!this.email)
    return;
 
  if(this.generalUpdate("emailLast", this.emailDelay)) {
    this.letters += this.emailInc * this.multiplier;
  }
}

export function updateMailTruck() {
  if(this.generalUpdate("mailTruckLast", this.mailTruckDelay)) {
    this.deliverLetter(this.mailTrucks * this.mailTruckInc * this.multiplier);
  }
}

export function updatePostOffices() {
  if(this.generalUpdate("postOfficeLast", this.postOfficeDelay)) {
    this.letters += (this.postOffices * this.postOfficeInc);
  }
}

export function updateMailmen() {
  if(this.letters < 1)
    return;

  const dec = this.caffeine ? (this.mailmanDelay - (this.mailmanDelay * this.caffeineBoost)) : 0;
  const delay = this.mailmanDelay - dec;

  if(this.generalUpdate("mailmanLast", delay)) {
    this.deliverLetter(this.mailmen * this.multiplier);
  }
}

export function updateFactories() {
  if(this.factories <= 0)
    return;

  const delay = this.factoryDelay / (this.scientificManagement ? 2 : 1);
  
  if(this.generalUpdate("factoryLast", delay)) {
    this.mailboxes += this.factoryGenerate * this.factories;;
  }

}

export function updateJets() {
  if(this.jets <= 0)
    return;

  if(this.generalUpdate("jetLast", this.jetDelay)) {
    this.deliverLetter(this.jetDelivery * this.jets * this.multiplier);
  }
}

export function updateRecruiters() {
  if(this.recruiters <= 0)
    return;

  if(this.generalUpdate("recruiterLast", this.recruiterDelay)) {
    this.mailmen += this.recruiterHire * this.recruiters;
  }
}

export function updateAutoReader() {
  if(this.autoreader <= 0)
    return;
  this.clickRead(this.autoreader);
}
