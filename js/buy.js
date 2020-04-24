export function buy(countVar, priceVar) { 
  if(priceVar === undefined)
    throw "Price Var Undefined (buy)";

  const price = priceVar;

  if(isNaN(price)) {
    throw "New price isn't a number (buy)";
  }

  if(this._data.money < price)
    return false;

  this._data.money -= price; 
  
  if(this._data[countVar] === undefined) {
    throw "CountVar is undefined (buy)";
  }

  this._data[countVar] += 1;

  return true;
}

export function buyOneTime(toggle, price) {
  if(this._data[toggle] || this.money < price) {
    return false;
  }

  this.money -= price;
  
  if(isNaN(this.money)) {
    throw "Money is not a number (buyOneTime)";
  }

  this._data[toggle] = true;

  return true;
}

export function buyMonopoly() {
  this.buy("monopoly", this.monopolyPrice);
}

export function buyPigeons() {
  return this.buy("pigeons", this.pigeonsPrice); 
}

export function buyDogTreats() {
  return this.buyOneTime("dogTreats", this.dogTreatsBasePrice);
}

export function buyBoxMod() {
  return this.buyOneTime("boxMod", this.boxModBasePrice);
}

export function buyBigNet() {
  /*
   * Increases letters per second
   */

  return this.buyOneTime("bigNet", this.bigNetBasePrice);
}

export function buyInflation() {
  /*
   * Increases letter price 
   */
  
  this.buyOneTime("inflation", this.inflationBasePrice);
}

export function buyEmail() {
  /*
   * Generates more letters per second
   */

  return this.buyOneTime("email", this.emailBasePrice);
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

export function buyMailDrones() {
  /*
   * Delivers 10 letters every 0.1 second
   */

  this.buyOneTime("mailDrones", this.mailDronesBasePrice);
}

export function buyMailware() {
  /*
   * Dramatically increases letters per second
   */

  this.buyOneTime("mailware", this.mailwareBasePrice);
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

  this.buyOneTime("segway", this.segwayBasePrice);
}

export function buySelfReliance() {
  /*
   *  Increases bootstrap inc
   */

  return this.buyOneTime("selfReliance", this.selfRelianceBasePrice);
}

export function buyBootstrap() {
  /*
   * Increases number of letters per click
   */

  if(this.money < this.bootstrapPrice) {
    this.letters += this.bootstrap * this.multiplier;
    this.lettersPs += this.bootstrap * this.multiplier;
    return false;
  }

  this.money -= this.bootstrapPrice;
  this.bootstrap += this.bootstrapInc;  
  this.clickInc += this.bootstrapInc * this.multiplier;

  return true;
}

export function buyFactory() {
  /*
   * Automatically acquires mailboxes 
   * Time between getting mailbox decreases by 5% for every new factory
   */

  return this.buy("factories", this.factoryPrice);
}

export function buyPostOffice() {
  /*
   * Generates more letters in less time
   */

  return this.buy("postOffices", this.postOfficePrice);

}

export function buyCaffeine() {
  /*
   * Increases mailman efficiency
   */

  this.buyOneTime("caffeine", this.caffeineBasePrice);
}

export function buyMailbox() {
  /*
   * Increases number of letters per second by one
   * Decreases letters delay by 2%
   */
  
  return this.buy("mailboxes", this.mailboxPrice);
}

export function buyRecruiter() {
  /*
   * Automatically hires a mailman per second
   * Decreases time between hires by 5% for every new recruiter
   *
   */

  return this.buy("recruiters", this.recruiterPrice);
}

export function buyMailman() {
  /*
   * Automates letter delivery
   * Delivers once ever 500ms
   * Delivers one letter per mailman
   * Reduces delivery delay by 2%
   *
   */

  return this.buy("mailmen", this.mailmanPrice);

}

export function buyJet() {
  /*
   * Delivers 10 letters every 0.5 seconds
   */

  return this.buy("jets", this.jetPrice);
}

export function buyMailTruck() {
  /*
   * Deliveres 2 letters every 0.5 seconds
   */

  return this.buy("mailTrucks", this.mailTruckPrice);
}

export function buyCorporateOffices() {
  return this.buy("corporateOffices", this.corporateOfficesPrice);
}

export function buyAds() {
  if(this.money < this.adsBasePrice)
    return false;
  
  this.money -= this.adsBasePrice;
  this.letters += this.getAdsLettersInc;
  return true;
}

export function buyAutoReader() {
  if(this.curiosity < this.autoreaderPrice)
    return false;

  this.autoreader += this.autoreaderInc;
  this.curiosity -= this.autoreaderPrice;

  return true;
}

export function buyMaxAutoReader() {
  while(this.buyAutoReader()) {
  }
}

export function buyMax(buyFunction) {
  while(buyFunction()) {}
}
