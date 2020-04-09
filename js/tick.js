export function updateLetters() {
  const now = new Date();
  if(now - new Date(this.lastLettersUpdate) < this.lettersDelay) {
    return;
  }

  this.letters += (this.lettersInc * (this.mailboxes + 1)) * this.multiplier;
  this.lastLettersUpdate = new Date();
}

export function updateRecruiters() {
  if(this.recruiters <= 0)
    return;

  const now = new Date();

  if(now - new Date(this.lastRecruiterHire) > this.recruiterHireDelay) {
    this.buyMailman(true);
    this.lastRecruiterHire = now;
  }
}

export function updateMailmen() {
  if(this.mailmen <= 0)
    return;

  const now = new Date();

  if(now - new Date(this.lastMailmanDelivery) > this.mailmanDeliveryDelay) {
    this.deliverLetter(this.mailmen);
    this.lastMailmanDelivery = now;
  }
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
