export function generalUpdate(last, delay) {
  if(this._data[last] < delay) {
    this._data[last] += this.delta;
    return false;
  }

  this._data[last] = 0;
  return true;
}

export function updateLetters() {
  if(this.generalUpdate("lettersLast", this.getLettersDelay)) {
    this.letters += (this.lettersInc * this.multiplier );
  }
}

export function updatePigeons() {
  if(this.pigeons <= 0)
    return;

  if(this.generalUpdate("pigeonsLast", this.getPigeonsDelay)) {
    this.deliverLetter(this.getPigeonsDelivery * this.multiplier);
  }
}

export function updateMailboxes() {
  if(this.mailboxes <= 0)
    return;

  if(this.generalUpdate("mailboxLast", this.getMailboxDelay)) {
    this.letters += (this.mailboxes * this.multiplier * this.getMailboxLettersInc);
  }
}

export function updateBigNet() {
  if(!this.bigNet)
    return;
  
  if(this.generalUpdate("bigNetLast", this.getBigNetDelay)) {
    this.letters += this.bigNetInc * this.multiplier;
  }
}

export function updateMailDrones() {
  if(!this.mailDrones)
    return;

  if(this.generalUpdate("mailDronesLast", this.getMailDronesDelay)) {
    this.deliverLetter(this.mailDronesDelivery * this.multiplier);
  }
}

export function updateMailware() {
  if(!this.mailware)
    return;

  if(this.generalUpdate("mailwareLast", this.getMailwareDelay)) {
    this.letters += this.mailwareInc * this.multiplier;
  }
}

export function updateEmail() {
  if(!this.email)
    return;
 
  if(this.generalUpdate("emailLast", this.getEmailDelay)) {
    this.letters += this.emailInc * this.multiplier;
  }
}

export function updateMailTruck() {
  if(this.generalUpdate("mailTruckLast", this.getMailTruckDelay)) {
    this.deliverLetter(this.mailTrucks * this.mailTruckInc * this.multiplier);
  }
}

export function updatePostOffices() {
  if(this.generalUpdate("postOfficeLast", this.getPostOfficeDelay)) {
    this.letters += (this.postOffices * this.postOfficeInc * this.multiplier);
  }
}

export function updateMailmen() {
  if(this.letters < 1)
    return;

  if(this.generalUpdate("mailmanLast", this.getMailmanDelay)) {
    this.deliverLetter(this.mailmen * this.multiplier);
  }
}

export function updateFactories() {
  if(this.factories <= 0)
    return;

  if(this.generalUpdate("factoryLast", this.getFactoryDelay)) {
    this.mailboxes += this.factoryGenerate * this.factories;
  }

}

export function updateJets() {
  if(this.jets <= 0)
    return;

  if(this.generalUpdate("jetLast", this.getJetDelay)) {
    this.deliverLetter(this.jetDelivery * this.jets * this.multiplier);
  }
}

export function updateRecruiters() {
  if(this.recruiters <= 0)
    return;

  if(this.generalUpdate("recruiterLast", this.getRecruiterDelay)) {
    this.mailmen += this.recruiterHire * this.recruiters;
  }
}

export function updateAutoReader() {
  if(this.autoreader <= 0)
    return;
  this.clickRead(this.autoreader);
}
