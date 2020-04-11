export function buy(
  free, 
  amount,
  countVar, 
  priceVar, 
  delayVar, 
  delayPercentageDecrease) 

{ 
  amount = amount || 1;
  if(!free) {
    const price = this[priceVar] * amount;

    if(this._data.money < price)
      return false;

    this._data.money -= price; 
  }
  
  this._data[countVar] += amount;

  if(delayVar && delayPercentageDecrease) {
    this._data[delayVar] -= (this._data[delayVar] * delayPercentageDecrease);
  }

  return true;
}

export function buyScientificManagement() {
  /*
   * One time upgrade. Cuts factory time in half
   */

  if(this.scientificManagement || this.scientificManagementBasePrice > this.money) {
    return;
  }

  this.money -= this.scientificManagementBasePrice;
  this.factoryDelay /= 2;
  this.scientificManagement = true;
}

export function buySegway() {
  /*
   * Increases mailman delivery speed by 5% per segway
   */

  return this.buy(false, 1, "segways", "segwayPrice", "mailmanDeliveryDelay", 0.05);  
}

export function buyMailtruck() {}

export function buyFactory() {
  /*
   * Automatically acquires mailboxes 
   * Time between getting mailbox decreases by 5% for every new factory
   */

  return this.buy(false, 1, "factories", "factoryPrice");
}

export function buyPostOffice() {}

export function buyMailbox(free, amount) {
  /*
   * Increases number of letters per second by one
   * Decreases letters delay by 2%
   */
  
  return this.buy(free, amount, "mailboxes", "mailboxPrice");
}

export function buyRecruiter() {
  /*
   * Automatically hires a mailman per second
   * Decreases time between hires by 5% for every new recruiter
   *
   */

  return this.buy(false, 1, "recruiters", "recruiterPrice");
}

export function buyMailman(free, amount) {
  /*
   * Automates letter delivery
   * Delivers once ever 500ms
   * Delivers one letter per mailman
   * Reduces delivery delay by 2%
   *
   */

  return this.buy(free, amount, "mailmen", "mailmanPrice");

}

export function buyMax(buyFunction) {
  while(buyFunction()) {}
}