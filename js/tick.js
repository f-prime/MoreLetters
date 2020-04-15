export function updateLetters() {
  if(this.lettersLast < this.lettersDelay) {
    this.lettersLast += this.delta;
    return;
  }

  this.letters += ((this.lettersInc * (this.mailboxes + 1)) * this.multiplier);
  this.lettersLast = 0;
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

  if(this.factoryLast < this.factoryDelay) {
    this.factoryLast += this.delta;
    return;
  }

  this.mailboxes += this.factoryGenerate;
  this.factoryLast = 0;
}

export function updateRecruiters() {
  if(this.recruiters <= 0)
    return;

  if(this.recruiterLast < this.recruiterDelay) {
    this.recruiterLast += this.delta;
    return;
  }

  this.mailmen += this.factoryGenerate;
  this.recruiterLast = 0;
}

export function updateState() {
  switch(this.phase) {
    case 0: {
      if(this.lettersDelivered > 40) {
        this.phase = 1;
      }
    }
  }
}
