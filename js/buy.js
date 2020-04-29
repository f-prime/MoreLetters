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
  return this.buy("monopoly", this.monopolyPrice);
}

export function buyPigeons() {
  return this.buy("pigeons", this.pigeonsPrice); 
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
