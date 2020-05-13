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
  const mult = this.letterMapping.ABDEGH.unlocked ? this.tisSaidMult : 1;
  this.corporateOfficeAdded += this.getCorporateOfficesIncrease * this.corporateOffices * delta * mult;
}

export function updateAdvertisers() {
  const mult = this.letterMapping.ABDEGH.unlocked ? this.tisSaidMult : 1;
  const delta = this.generalUpdate(this.advertisersDelay);
  this.clickInc += this.advertisersInc * this.advertisers * delta * mult;
}

export function updateBreeder() {
  const delta = this.generalUpdate(this.breederDelay);
  const mult = this.letterMapping.ABDEGH.unlocked ? this.tisSaidMult : 1;
  this.pigeons += this.breederBreed * this.breeders * delta * mult;
}

export function updatePigeons() {
  const delta = this.generalUpdate(this.getPigeonsDelay);
  const mult = this.letterMapping.ABDEGH.unlocked ? this.tisSaidMult : 1;
  this.deliverLetter(this.getPigeonsDelivery * this.pigeons * delta * mult);
}

export function updateMailboxes() {
  const delta = this.generalUpdate(this.getMailboxDelay);
  const mult = this.letterMapping.ABDEGH.unlocked ? this.tisSaidMult : 1;
  const inc = (this.mailboxes + this.factoryMailboxes) * this.getMailboxLettersInc * delta * mult;
  this.letters += inc;
  this.lettersPs += inc;
}

export function updateMailmen() {
  if(this.letters < 1)
    return;
  
  const mult = this.letterMapping.ABDEGH.unlocked ? this.tisSaidMult : 1;
  const delta = this.generalUpdate(this.getMailmanDelay);
  this.deliverLetter((this.mailmen + this.corporateOfficeAdded) * delta * mult);
}

export function updateFactories() {
  const delta = this.generalUpdate(this.getFactoryDelay);
  const mult = this.letterMapping.ABDEGH.unlocked ? this.tisSaidMult : 1;
  this.factoryMailboxes += this.factoryGenerate * (this.factories + this.corporateOfficeAdded) * delta * mult;

}
