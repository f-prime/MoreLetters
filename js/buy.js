export function buyMailtruck() {}
export function buyFactory() {}
export function buyPostOffice() {}

export function buyMailbox() {
  /*
   * Increases number of letters per second by one
   * Decreases letters delay by 2%
   */

  const price = this.mailboxPrice;

  if(this.money < price)
    return;

  this.mailboxes += 1;
  this.lettersDelay -= (this.lettersDelay * 0.02);
  this.money -= price;
}

export function buyRecruiter() {
  /*
   * Automatically hires a mailman per second
   * Decreases time between hires by 5% for every new recruiter
   *
   */

  const price = this.recruiterPrice;

  if(this.money < price)
    return;

  this.recruiters += 1;
  this.recruiterHireDelay -= (this.recruiterHireDelay * 0.05);
  this.money -= price;
}

export function buyMailman(free) {
  /*
   * Automates letter delivery
   * Delivers once ever 500ms
   * Delivers one letter per mailman
   * Reduces delivery delay by 2%
   *
   */

  if(!free) {
    const price = this.mailmanPrice;

    if(this.money < price)
      return;
    
    this.money -= price;
  }

  this.mailmen += 1;
  this.mailmanDeliveryDelay -= this.mailmanDeliveryDelay * 0.02
}
