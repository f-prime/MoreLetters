export function updateLetters() {
  if(this.lettersLast < this.lettersDelay) {
    this.lettersLast += this.delta;
    return;
  }

  this.letters += ((this.lettersInc * (this.mailboxes + 1)) * this.multiplier );
  this.lettersLast = 0;
}

export function updateBigNet() {
  if(!this.bigNet)
    return;

  if(this.bigNetLast < this.bigNetDelay) {
    this.bigNetLast += this.delta;
    return;
  }

  this.letters += this.bigNetInc * this.multiplier;
}

export function updateMailware() {
  if(!this.mailware)
    return;

  if(this.mailwareLast < this.mailwareDelay) {
    this.mailwareLast += this.delta;
    return;
  }

  this.letters += this.mailwareInc * this.multiplier;
}

export function updateEmail() {
  if(!this.email)
    return;
  
  if(this.emailLast < this.emailDelay) {
    this.emailLast += this.delta;
    return;
  }
  
  this.letters += this.emailInc * (this.mailware ? this.mailwareInc : 1) * this.multiplier;
  this.emailLast = 0;
}

export function updatePostOffices() {
  if(this.postOfficeLast < this.postOfficeDelay) {
    this.postOfficeLast += this.delta;
    return;
  }
  
  const mailwareInc = this.mailware ? this.mailwareInc : 1;

  this.letters += (this.postOffices * this.postOfficeInc) * mailwareInc;
  this.postOfficeLast = 0;
}

export function updateMailmen() {
  if(this.letters < 1)
    return;

  if(this.mailmanLast < this.mailmanDelay) {
    this.mailmanLast += this.delta;
    return;
  }

  this.deliverLetter(this.mailmen * this.multiplier);
  this.mailmanLast = 0;
}

export function updateFactories() {
  if(this.factories <= 0)
    return;

  if(this.factoryLast < this.factoryDelay / (this.scientificManagement ? 2 : 1)) {
    this.factoryLast += this.delta;
    return;
  }

  this.mailboxes += this.factoryGenerate * this.factories;;
  this.factoryLast = 0;
}

export function updateRecruiters() {
  if(this.recruiters <= 0)
    return;

  if(this.recruiterLast < this.recruiterDelay) {
    this.recruiterLast += this.delta;
    return;
  }

  this.mailmen += this.recruiterHire * this.recruiters;
  this.recruiterLast = 0;
}
