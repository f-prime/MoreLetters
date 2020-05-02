export function generalUpdate(delay) {
  return this.delta / delay;
}

export function updateLetters() {
  const increment = this.generalUpdate(this.getLettersDelay);
  const inc = this.lettersInc * increment;
  this.letters += inc;
  this.lettersPs += inc;
}

export function updateCorporateOffices() {
  if(this.corporateOffices <= 0)
    return;

  const delta = this.generalUpdate(this.orporateOfficesDelay);
  this.factories += this.getCorporateOfficesIncrease * this.corporateOffices * delta;
  this.mailmen += this.getCorporateOfficesIncrease * this.corporateOffices * delta;
}

export function updateAdvertisers() {
  if(this.advertisers <= 0)
    return;

  const delta = this.generalUpdate(this.advertisersDelay);
  this.clickInc += this.advertisersInc * this.advertisers * delta;
}

export function updateBreeder() {
  if(this.breeders <= 0)
    return;

  const delta = this.generalUpdate(this.breederDelay);
  this.pigeons += this.breederBreed * this.breeders * delta;
}

export function updatePigeons() {
  if(this.pigeons <= 0)
    return;

  const delta = this.generalUpdate(this.getPigeonsDelay);
  this.deliverLetter(this.getPigeonsDelivery * this.pigeons * delta);
}

export function updateMailboxes() {
  if(this.mailboxes <= 0)
    return;

  const delta = this.generalUpdate(this.getMailboxDelay);
  const inc = this.mailboxes * this.getMailboxLettersInc * delta;
  this.letters += inc;
  this.lettersPs += inc;
}

export function updateMailmen() {
  if(this.letters < 1)
    return;

  const delta = this.generalUpdate(this.getMailmanDelay);
  this.deliverLetter(this.mailmen * delta);
}

export function updateFactories() {
  if(this.factories <= 0)
    return;

  const delta = this.generalUpdate(this.getFactoryDelay);
  this.mailboxes += this.factoryGenerate * this.factories * delta;

}
