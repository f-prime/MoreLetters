export function buyMailtruck() {}

export function buyFactory() {
  /*
   * Automatically acquires mailboxes 
   * Time between getting mailbox decreases by 5% for every new factory
   */

  const price = this.factoryPrice;

  if(this.money < price)
    return;

  this.factories += 1;
  this.factoryDelay -= (this.factoryDelay * 0.05);
  this.money -= price;
}

export function buyPostOffice() {}

export function buyMailbox(free, amount) {
  /*
   * Increases number of letters per second by one
   * Decreases letters delay by 2%
   */

  amount = amount || 1;

  if(!free) {
    const price = this.mailboxPrice * amount;

    if(this.money < price)
      return;

    this.money -= price;
  }

  this.mailboxes += amount;
  this.lettersDelay -= (this.lettersDelay * 0.02);
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

export function buyMailman(free, amount) {
  /*
   * Automates letter delivery
   * Delivers once ever 500ms
   * Delivers one letter per mailman
   * Reduces delivery delay by 2%
   *
   */

  amount = amount || 1;

  if(!free) {
    const price = this.mailmanPrice * amount;

    if(this.money < price)
      return;
    
    this.money -= price;
  }

  this.mailmen += amount;
  this.mailmanDeliveryDelay -= this.mailmanDeliveryDelay * 0.02
}
