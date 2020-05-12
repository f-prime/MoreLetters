export function generalUpdate(delay) {
  return this.delta / delay;
}

export function updateLetters() {
  if(this.choosePowerups)
    return;

  const delta = this.generalUpdate(this.getLettersDelay);
  
  let inc;

  if(this.letterMapping.ABDEGI.unlocked) {
    inc = delta * this.hackerLPS;
  } else {
    inc = this.lettersInc * delta;
  }

  this.letters += inc;
  this.lettersPs += inc;
}

export function updateCorporateOffices() {
  const delta = this.generalUpdate(this.corporateOfficesDelay);
  this.corporateOfficeAdded += this.getCorporateOfficesIncrease * this.corporateOffices * delta;
}

export function updateAdvertisers() {
  const delta = this.generalUpdate(this.advertisersDelay);
  this.clickInc += this.advertisersInc * this.advertisers * delta;
}

export function updateBreeder() {
  const delta = this.generalUpdate(this.breederDelay);
  this.pigeons += this.breederBreed * this.breeders * delta;
}

export function updatePigeons() {
  const delta = this.generalUpdate(this.getPigeonsDelay);
  this.deliverLetter(this.getPigeonsDelivery * this.pigeons * delta);
}

export function updateMailboxes() {
  const delta = this.generalUpdate(this.getMailboxDelay);
  const inc = (this.mailboxes + this.factoryMailboxes) * this.getMailboxLettersInc * delta;
  this.letters += inc;
  this.lettersPs += inc;
}

export function updateMailmen() {
  if(this.letters < 1)
    return;

  const delta = this.generalUpdate(this.getMailmanDelay);
  this.deliverLetter((this.mailmen + this.corporateOfficeAdded) * delta);
}

export function updateFactories() {
  const delta = this.generalUpdate(this.getFactoryDelay);
  this.factoryMailboxes += this.factoryGenerate * (this.factories + this.corporateOfficeAdded) * delta;

}
