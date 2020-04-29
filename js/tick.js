export function generalUpdate(delay) {
  return this.delta / delay;
}

export function updateLetters() {
  const increment = this.generalUpdate(this.getLettersDelay);
  const inc = (this.lettersInc * this.multiplier ) * increment;
  this.letters += inc;
  this.lettersPs += inc;
}

export function updateCorporateOffices() {
  if(this.corporateOffices <= 0)
    return;

  const delta = this.generalUpdate(this.getCorporateOfficesDelay);
  this.factories += this.getCorporateOfficesIncrease * this.corporateOffices * delta;
  this.recruiters += this.getCorporateOfficesIncrease * this.corporateOffices * delta;
}

export function updatePigeons() {
  if(this.pigeons <= 0)
    return;

  const delta = this.generalUpdate(this.getPigeonsDelay);
  this.deliverLetter(this.getPigeonsDelivery * this.multiplier * this.pigeons * delta);
}

export function updateMailboxes() {
  if(this.mailboxes <= 0)
    return;

  const delta = this.generalUpdate(this.getMailboxDelay);
  const inc = this.mailboxes * this.multiplier * this.getMailboxLettersInc * delta;
  this.letters += inc;
  this.lettersPs += inc;
}

export function updateMonopoly() {
  if(this.monopoly <= 0)
    return;

  const delta = this.generalUpdate(this.getMonopolyDelay);
  this.corporateOffices += this.monopolyIncrease * this.monopoly * delta;;
}

export function updateMailTruck() {
  if(this.generalUpdate("mailTruckLast", this.getMailTruckDelay)) {
    this.deliverLetter(this.mailTrucks * this.mailTruckInc * this.multiplier);
  }
}

export function updatePostOffices() {
  if(this.generalUpdate("postOfficeLast", this.getPostOfficeDelay)) {
    const inc = (this.postOffices * this.postOfficeInc * this.multiplier);
    this.letters += inc;
    this.lettersPs += inc;
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
