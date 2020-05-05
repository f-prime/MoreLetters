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

export function buyTwoHands() {
  if(this.buy("twoHands", this.twoHandsPrice)) {
    this.clickInc *= 2;
  } 

  return false;
}

export function buyBreeder() {
  return this.buy("breeders", this.breederBasePrice);
}

export function buyPigeons() {
  return this.buy("pigeons", this.pigeonsBasePrice); 
}

export function buyBootstrap() {
  /*
   * Increases number of letters per click
   */

  if(this.money < this.bootstrapPrice) {
    return false;
  }

  this.money -= this.bootstrapPrice;
  this.bootstrap += this.bootstrapInc;  
  this.clickInc += this.bootstrapInc;

  return true;
}

export function buyFactory() {
  /*
   * Automatically acquires mailboxes 
   * Time between getting mailbox decreases by 5% for every new factory
   */

  return this.buy("factories", this.factoryPrice);
}

export function buyMailbox() {
  /*
   * Increases number of letters per second by one
   * Decreases letters delay by 2%
   */
  
  return this.buy("mailboxes", this.mailboxPrice);
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

export function buyCorporateOffices() {
  return this.buy("corporateOffices", this.corporateOfficesPrice);
}

export function buyAdvertisers() {
  return this.buy("advertisers", this.advertisersPrice);
}

export function buyMax(buyFunction) {
  while(buyFunction()) {}
}
