export function generalUpdate(that, lastUpdate, delay, func, greaterThanZero) {
  if(greaterThanZero <= 0)
    return;
  
  const now = new Date();

  if(now - new Date(that[lastUpdate]) > delay) {
    func();
    that[lastUpdate] = now;
  }
}

export function updateLetters() {
  const now = new Date();
  if(now - new Date(this.lastLettersUpdate) < this.lettersDelay) {
    return;
  }

  this.letters += (this.lettersInc * (this.mailboxes + 1)) * this.multiplier;
  this.lastLettersUpdate = new Date();
}

export function updateFactories() {
  generalUpdate(this, "lastFactory", this.factoryDelay, () => {
    this.buyMailbox(true, this.factories);
  }, this.factories);

}

export function updateRecruiters() {
  generalUpdate(this, "lastRecruiterHire", this.recruiterHireDelay, () => {
    this.buyMailman(true, this.recruiters);
  }, this.recruiters);
}

export function updateMailmen() {
  generalUpdate(this, "lastMailmanDelivery", this.mailmanDeliveryDelay, () => {
    this.deliverLetter(this.mailmen);
  }, this.mailmen);
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
