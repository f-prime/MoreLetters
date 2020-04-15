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

  const dogsHit = this.angryDogs ? this.angryDogsMailmanHit : 1; 

  if(this.mailmanLast < this.mailmanDelay * (1 / dogsHit)) {
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

export function updateDogs() {
  if(this.phase < 2)
    return;
  
  if(this.angryDogs) {
    if(this.angryDogsLast > 1000) {
      this.angryDogs -= 1;
      this.angryDogsLast = 0;
    } else {
      this.angryDogsLast += this.delta;
    }
  } else {
    if(this.angryDogsLast > 1000) {
      if(Math.random() <= this.angryDogsChance) {
        this.angryDogs = this.angryDogsDuration;
      }
      this.angryDogsLast = 0;
    } else {
      this.angryDogsLast += this.delta;
    }
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
