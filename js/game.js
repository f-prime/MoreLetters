'use strict';

import {
  setupTests,
} from "./tests.js"

import { 
  originalState, 
  saveState, 
  loadState, 
  newGame,
  calculateNewState,
} from "./state.js";

import { 
  generalUpdate,
  updateCorporateOffices,
  updateMailmen, 
  updatePigeons,
  updateMailboxes,
  updateBreeder,
  updateFactories,
  updateLetters,
  updateAdvertisers,
} from "./tick.js";

import { 
  buy,
  buyAdvertisers,
  buyTwoHands,
  buyCorporateOffices,
  buyBreeder,
  buyPigeons,
  buyMailbox, 
  buyMailman,
  buyFactory,
  buyBootstrap,
  buyOneTime,
  buyMax,
} from "./buy.js";

Vue.component("timed-event", {
  props: ["title", "seconds", "description"],

  template: `
  <div>
    <div class="event-name">{{ title }}</div>
    <div class="event-timer">{{ seconds }} seconds</div>
    <div class="event-description">{{ description }}</div>
  </div>
  `
});

Vue.component("stat", {
  props: ["value", "name"],
  
  template: `
    <div class="column stat">
      <div class="stat-value">{{ value }}</div>
      <div class="stat-name">{{ name }}</div>
    </div>
  `
});

Vue.component('buy-button', {
  props:[
    'title', 
    'price', 
    'description', 
    'maxBuy',
    'owned',
    'curiosity',
    'chosen',
    'choose',
  ],
  
  data() {
    return {
      isChosen: Boolean(this.chosen),
    }
  },

  methods: {
    buy: function() {
      this.$emit("buy");
    },

    setChosen: function() {
      this.isChosen = !this.isChosen;
      this.$emit("chosen");
    },

    action: function() {
      if(this.choose) {
        this.setChosen();
      } else {
        this.buy();
      }
    },

    buyMax: function() {
      this.$emit("buy-max");
    }
  },

  template: `
    <div class="button column powerup-btn" :class="isChosen ? 'chosen' : ''"  @click='action'>
      <div class="button-name">
        <div class="button-title">
          {{ title }}
          <div v-if="!owned && !curiosity">(\${{ price }})</div>
        </div>
        <div v-else-if="curiosity">({{ price }} curiosity)</div>
        <div v-else>(owned)</div>
      </div>
      <div class="button-description">
        {{ description }}
      </div>
      <div v-show="maxBuy" class="buy-max" @click="buyMax">
        (buy max)
      </div>
    </div>
  `
});

const vw = new Vue({
  el:"#app",
  
  data: Object.assign({}, originalState), 
 
  computed: {
    breederDescription: function() {
      return `Generates ${this.breederBreed} ${this.breederBreed > 1 ? 'pigeons' : 'pigeon'} every ${this.breederDelay / 1000} seconds at no cost.`;
    },

    breederPrice: function() {
      return this.round(this.breederBasePrice + (this.breeders ** 2));
    },

    mailmanDescription: function() {
      return `Delivers ${this.mailmanDelivery} ${this.mailmanDelivery > 1 ? 'letters' : 'letter'} every ${this.round(this.getMailmanDelay / 1000)} seconds.`;
    },
   
    mailboxDescription: function() {
      return `Generates ${this.getMailboxLettersInc} ${this.getMailboxLettersInc > 1 ? 'letters' : 'letter'} every ${this.getMailboxDelay / 1000} seconds.`
    },

    bootstrapDescription: function() {
      return `Increases letters per click by ${this.bootstrapInc}. Also gives the ability to manually generate letters.`;
    },

    factoryDescription: function() {
      return `Generates ${this.factoryGenerate} ${this.factoryGenerate == 1 ? 'mailbox' : 'mailboxes'} every ${this.getFactoryDelay / 1000} seconds at no cost.`;
    },

    pigeonsDescription: function() {
      return `Deliver ${this.getPigeonsDelivery} letter every ${this.getPigeonsDelay / 1000} seconds. Pigeons do not get more expensive.`; 
    },

    twoHandsDescription: function() {
      return `Multiplies letters per click and Bootstrap increase by ${this.twoHandsMult}.`
    },

    twoHandsPrice: function() {
      return this.round(this.twoHandsBasePrice + (this.twoHands ** 7));
    },

    corporateOfficesDescription: function() {
      return `Generates ${this.getCorporateOfficesIncrease} mailman and factory every ${this.corporateOfficesDelay / 1000} seconds at no cost.`; 
    },

    corporateOfficesPrice: function() {
      return this.round(this.corporateOfficesBasePrice + (this.corporateOffices ** 2));
    },

    getCorporateOfficesIncrease: function() {
      return this.corporateOfficesIncrease;
    },

    advertisersDescription: function() {
      return `Increases deliveries per click by ${this.advertisersInc} every ${this.advertisersDelay / 1000} seconds.`;
    },

    advertisersPrice: function() {
      return this.round(this.advertisersBasePrice + (this.advertisers ** 1.5));
    },

    getPigeonsDelivery: function() {
      return this.pigeonsDelivery;
    },

    getPigeonsDelay: function() {
      return this.pigeonsDelay;
    },

    getLettersDelay: function() {
      return this.lettersDelay;
    },

    getPricePerLetter: function() {
      const inflation = this.inflation ? this.inflationIncrease : 0;
      const increase = this.pricePerLetter * inflation;
      return this.pricePerLetter + increase;
    },

    getMailboxLettersInc: function() {
      const boxMod = this.boxMod ? this.boxModBoost : 0;
      return this.mailboxLettersInc + boxMod;
    },

    getMailboxDelay: function() {
      return this.mailboxDelay;
    },

    getMailmanDelay: function() {
      return this.mailmanDelay;
    },

    getFactoryDelay: function() {
      const delay = this.factoryDelay / (this.scientificManagement ? 2 : 1);

      return delay;
    },

    bootstrapInc: function() {
      const mult = this.twoHands ? (this.twoHands * this.twoHandsMult) : 1;
      let inc = this.bootstrapDelivery * mult;
      return inc;
    },

    postOfficePrice: function() {
      return this.round(this.postOfficeBasePrice + (this.postOffices ** 2.3));
    },

    bootstrapPrice: function() {
      return this.round(this.bootstrapBasePrice + (this.bootstrap ** 1.5))
    },

    factoryPrice: function() {
      return this.round(this.factoryBasePrice + (this.factories ** 2.0));
    },

    mailmanPrice: function() {
      return this.round(this.mailmanBasePrice + (this.mailmen ** 1.5));
    },

    mailboxPrice: function() {
      return this.round(this.mailboxBasePrice + (this.mailboxes ** 1.2));
    },

    nextPhaseAt: function() {
      switch(this.phase) {
        case 0:
          return this.phase1;
        case 1:
          return this.phase2;
        case 2:
          return this.phase3;
        case 3:
          return this.phase4;
        default:
          return Infinity;
      }
    },

    nextPhaseAvailable: function() {
      return this.lettersDelivered >= this.nextPhaseAt;
    }
  },

  watch: {
    openLetter: function(val) {
      if(val) {
        if(!this.lettersTexts[this.path]) {
          this.lettersTexts[this.path] = "";
        }

        setTimeout(() => {
          document.getElementById("decipher-textarea").focus();
        }, 300);
      }
    },

    decipherText: function(val) {
      if(!val || !this.plaintext)
        return;

      val = val.trim().replace(/\n/g, '');
      const plaintext = this.plaintext.trim().replace(/\n/g, '');
      
      this.lettersTexts[this.path] = val;

      if(val == plaintext) {
        this.deciphered = true;
      }
    }
  },

  methods: {
    updateLettersPerSecond: function() {
      if(this.lastLettersPs < 1000) {
        this.lastLettersPs += this.delta;
      } else {
        this.prevLettersPs = this.lettersPs;
        this.lastLettersPs = 0;
        this.lettersPs = 0;
      }
    },

    updateDeliveriesPerSecond: function() {
      if(this.lastDeliveryPs <= 1000) {
        this.lastDeliveryPs += this.delta;
      } else {
        this.prevDeliveryPs = this.deliveryPs;
        this.lastDeliveryPs = 0;
        this.deliveryPs = 0;
      }
    },
    
    nextPhase: function() {
      if(this.phase != this.readPhase - 1) {
        this.choosePowerups = true;
      } else {
        this.prestige();
      }
    }, 
  
    getLetter: function() {
      var headers = {
        method: 'GET',
        headers: {
          "pragma":"no-cache",
          "cache-control":"no-cache",
        },
      };
   
      this.correspondence = true;
      this.path = this.path.split('').sort((a,b) => a > b ? 1 : -1).join("");
      this.decipherText = "";
      this.deciphered = false;
      if(this.lettersTexts[this.path]) {
        this.decipherText = this.lettersTexts[this.path];
      }

      console.log(this.path);

      fetch(`/letters/encrypted/${this.path}.txt`, headers)
        .then(resp => {
          if(resp.status === 404) {
            throw 404;
          }

          return resp.text()
        
        })
        .then(text => {
          this.letter = text;
          fetch(`/letters/encrypted/${this.path}_plaintext.txt`, headers)
            .then(resp => resp.text())
            .then(text => {
              this.plaintext = text;
              if(this.lettersHave.indexOf(this.path) !== -1)
                this.deciphered = text;
            });

        })
      .catch(e => {
        fetch(`/letters/0.txt`, headers)
          .then(resp => resp.text())
          .then(text => {
            this.letter = text;
            fetch(`/letters/0_plaintext.txt`, headers)
              .then(resp => resp.text())
              .then(text => {
                this.plaintext = text; 
              });
          })
      });

    },

    choose: function(name) {
      const chosen = this.powerups[name];
      const letter = this.pathMap[name];
      
      if(chosen) {
        this.path = this.path.repalce(letter, '');
        this.numChosen -= 1;
        if(this.numChosen < 0) {
          this.numChosen = 0;
        }
      } else {
        this.path += letter;
        this.powerups[name] = true;
        this.numChosen += 1;
      }

      if(this.numChosen >= 2) {
        this.prestige();
      }
    },

    getFormatted: function(number, divisor) {
      const result = (number / divisor).toString().match(/[0-9]+\.?[0-9]?[0-9]?/g);
      if(result == null)
        return 0;
      return result[0];
    },
  
    floor: Math.floor,
    ceil: Math.ceil,

    format: function(number) {
      if(number < 10**3)
        return number;

      if (number < 10**6) {
        return this.getFormatted(number, 10**3) + "k";
      } else if (number < 10**9) {
        return this.getFormatted(number, 10**6) + "m";
      } else if (number < 10**12) {
        return this.getFormatted(number, 10**9) + "b";
      } else if (number < 10**15) {
        return this.getFormatted(number, 10**12) + "t";
      } else if (number < 10**18) {
        return this.getFormatted(number, 10**15) + "s";
      } else if (number == Infinity) {
        return "Infinity";
      }

      return this.getFormatted(number, 10**15) + "q";
    },

    round: function(number) {
      number *= 100;
      return Math.floor(number) / 100;
    },
   
    prestige: function() {
      if(!this.nextPhaseAvailable)
        return;

      this.choosePowerups = false;
      this.numChosen = 0;

      const lettersDelivered = this.lettersDelivered;
      const phase = this.phase;
      const day = this.day;
      const powerups = this.powerups;
      const path = this.path;
      const correspondence = this.correspondence;
      const lettersTexts = this.lettersTexts;
      const letterPowerupStates = this.letterPowerupStates;
      
      for(const key in originalState) {
        this.$data[key] = originalState[key];
      }
  
      this.lettersTexts = lettersTexts;
      this.letterPowerupStates = letterPowerupStates;
      this.correspondence = correspondence;
      this.path = path;
      this.powerups = powerups;
      this.day = day;
      this.phase = phase + 1;
      this.letters = 0;  
      
      if(this.phase == this.readPhase) {
        this.getLetter();
        this.read = true;
      }
    },
 
    clickGenerate: function() {
      if(!this.powerups.Bootstrap)
        return;

      this.letters += this.clickInc;
      this.lettersPs += this.clickInc;
    },

    clickDeliver: function() {
      if(this.letters == 0)
        return;
     
      this.deliverLetter(Math.ceil(this.clickInc));
      this.clickDelivery += 1;

    },

    deliverLetter: function(amount) {
      /*
       * Delivers N amount of letters if possible
       */

      if(this.letters < 1)
        return;

      if(this.letters < amount) {
        amount = this.letters;
      }
      
      this.deliveryPs += amount;
      this.letters -= amount;
      this.money += this.getPricePerLetter * amount;
      this.lettersDelivered += amount;

    },

    handleDebug: function() {
      this.lettersDelivered = 10 ** 15;
      this.money = 10 ** 15;
    },

    update: function() {
      const now = new Date();
      this.delta = now - new Date(this.lastTick);
      this.lastTick = now;

      if(!this.read) {
        this.updateLetters();
        this.updateMailmen();
        this.updateAdvertisers();
        this.updateBreeder();
        this.updateMailboxes();
        this.updateCorporateOffices();
        this.updatePigeons();
        this.updateDeliveriesPerSecond(); 
        this.updateFactories();
        this.updateLettersPerSecond();
      }
      
      this.saveState();
    },

    generalUpdate,
    updateFactories,
    updateBreeder,
    updateLetters,
    updateMailmen,
    updateCorporateOffices,
    updatePigeons,
    updateMailboxes,
    updateAdvertisers,
    saveState,
    loadState,
    calculateNewState,
    newGame,
    buyMailman,
    buyTwoHands,
    buyAdvertisers,
    buyCorporateOffices,
    buyMailbox,
    buyFactory,
    buyBreeder,
    buyBootstrap,
    buyPigeons,
    buyOneTime,
    buy,
    buyMax,
    setupTests,
  },

  created: function() {
    document.addEventListener("debug", this.handleDebug);

    this.setupTests(),
    this.loadState();
    setInterval(this.update, 0);
  }

});

