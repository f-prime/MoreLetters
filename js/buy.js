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

export function buyOneTime(toggle, price) {
  if(this._data[toggle] || this.money < price) {
    return false;
  }

  this.money -= price;
  this._data[toggle] = true;

  return true;
}

export function buySpontaneousGeneration() {
  /*
   * Random chance to quadruple number of letters per click
   */
  return this.buyOneTime("spontaneousGeneration", this.spontaneousGenerationBasePrice);
}

export function buyLittleHelp() {
  /*
   * Randomly generates a mailman per delivery click
   */
  
  return this.buyOneTime("littleHelp", this.littleHelpBasePrice);
}

export function buyTwoForOne() {
  /*
   * Doubles Bootstrap increment
   */

  return this.buyOneTime("twoForOne", this.twoForOneBasePrice);
}

export function buyScientificManagement() {
  /*
   * One time upgrade. Cuts factory time in half
   */

  this.buyOneTime("scientificManagement", this.scientificManagementBasePrice)

}

export function buyTwoHands() {
  /*
   *  One time upgrade. Random chance that a click to deliver will be multiplied by some multiplier.
   */
  
  this.buyOneTime("twoHands", this.twoHandsBasePrice);
}

export function buySegway() {
  /*
   * Increases mailman delivery speed by 2.5% per segway
   */

  return this.buy(false, 1, "segways", "segwayPrice", "mailmanDeliveryDelay", this.segwayMailmanBOost);  
}

export function buyMailtruck() {}

export function buyBootstrap() {
  /*
   * Increases number of letters per click by 1 but decreases mailman efficiency
   */

  if(this.money < this.bootstrapPrice)
    return false;

  this.money -= this.bootstrapPrice;
  this.bootstrap += this.bootstrapInc;  
  this.clickInc += 1 * this.multiplier;

  return true;
}

export function buyFactory() {
  /*
   * Automatically acquires mailboxes 
   * Time between getting mailbox decreases by 5% for every new factory
   */

  return this.buy(false, 1, "factories", "factoryPrice");
}

export function buyPostOffice() {
  /*
   * Generates more letters in less time
   */

  return this.buy(false, 1, "postOffices", "postOfficePrice");

}

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
