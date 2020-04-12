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
  generalUpdate(this, "lastLettersUpdate", this.lettersDelay, () => {
    this.letters += (this.lettersInc * (this.mailboxes + 1)) * this.multiplier;
  });
}

export function updateBakery() {
  if(!this.bakery)
    return;
  
  generalUpdate(this, "lastBakeryUpdate", this.bakeryDelay, () => {
    this.dogTreats += this.bakeryTreatsIncrement; 
  });
}

export function updateDogs() {
  if(this.phase === 0) {
    return;
  }

  if(this.dogTreats && this.angryDogs) {
    if(this.dogTreats > this.angryDogs) {
      this.angryDogs = 0;
      this.dogTreats -= this.angryDogs;
    } else {
      this.angryDogs -= this.dogTreats;
      this.dogTreats = 0;
    }
    return;
  }

  generalUpdate(this, "lastAngryDog", this.angryDogDelay / this.multiplier, () => {
    if(this.dogTreats > 0) {
      this.angryDogs -= this.dogTreatsDecrement;
      this.dogTreats -= this.dogTreatsDecrement;

      if(this.angryDogs < 0)
        this.angryDogs = 0;
      if(this.dogTreats < 0)
        this.dogTreats = 0;
    } else {
      this.angryDogs += this.dogsPerTick;
    }
  });
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
  generalUpdate(this, "lastMailmanDelivery", this.mailmanDeliveryDelay + (this.angryDogEfficiencyHit * this.angryDogs), () => {
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
