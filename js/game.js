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
  updateMonopoly,
  updatePostOffices,
  updateMailmen, 
  updateRecruiters,
  updatePigeons,
  updateMailTruck,
  updateMailboxes,
  updateAutoReader,
  updateBreeder,
  updateFactories,
  updateLetters,
  updateAdvertisers,
} from "./tick.js";

import { 
  buy,
  buyAdvertisers,
  buyMonopoly,
  buyCorporateOffices,
  buyAutoReader,
  buyMaxAutoReader,
  buyBreeder,
  buyPigeons,
  buyMailbox, 
  buyRecruiter,
  buyMailTruck,
  buyMailman,
  buyFactory,
  buyBootstrap,
  buyOneTime,
  buyPostOffice,
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
          <span v-if="!owned && !curiosity">(\${{ price }})</span>
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
    autoreaderDescription: function() {
      return `Auto reads letters.`;
    },

    breederDescription: function() {
      return `Generates ${this.breederBreed} ${this.breederBreed > 1 ? 'pigeons' : 'pigeon'} every ${this.breederDelay / 1000} seconds. Breeders' price does not scale`;
    },

    breederPrice: function() {
      return this.round(this.breederBasePrice + (this.breeders ** 2));
    },

    mailmanDescription: function() {
      return `Deliver ${this.mailmanDelivery} ${this.mailmanDelivery > 1 ? 'letters' : 'letter'} per mailman automatically every ${this.round(this.getMailmanDelay / 1000)} seconds.`;
    },
   
    mailboxDescription: function() {
      return `Generates ${this.getMailboxLettersInc} letter per mailbox every ${this.getMailboxDelay / 1000} seconds.`
    },

    bootstrapDescription: function() {
      return `Multiplies letters per click by ${this.bootstrapInc}. If you don't have enough funds, then an amount of letters equal to your letters per click will be generated instead.`;
    },

    recruiterDescription: function() {
      return `Hires ${this.recruiterHire} mailmen per recruiter every ${this.getRecruiterDelay / 1000} seconds. Hiring does not cost money.`;
    },

    factoryDescription: function() {
      return `Generates ${this.factoryGenerate} ${this.factoryGenerate == 1 ? 'mailbox' : 'mailboxes'} per factory every ${this.getFactoryDelay / 1000} seconds. These mailboxes do not cost anything.`;
    },

    segwayDescription: function() {
      return `Increases mailman delivery speed by ${this.segwayMailmanBoost * 100}%. This is a one time purchase.`
    },

    postOfficeDescription: function() {
      return `Generates ${this.postOfficeInc} letters every ${this.getPostOfficeDelay / 1000} seconds.`;
    },

    mailTruckDescription: function() {
      return `Automatically delivers ${this.mailTruckInc} letters every ${this.getMailTruckDelay / 1000} seconds`;
    },

    postOfficDescription: function() {
      return `Generates two letters every ${this.getPostOfficeDelay / 1000} seconds.`;
    },

    pigeonsDescription: function() {
      return `Pigeons deliver ${this.getPigeonsDelivery} letters every ${this.getPigeonsDelay / 1000} seconds. Pigeons' price does not scale with the number purchased.`; 
    },

    monopolyDescription: function() {
      return `Establishes ${this.monopolyIncrease} Corporate Office every ${this.getMonopolyDelay / 1000} seconds.`;
    },

    getMonopolyDelay: function() {
      return this.monopolyDelay;
    },

    monopolyPrice: function() {
      return this.round(this.monopolyBasePrice + (this.monopoly ** 1.9));
    },

    corporateOfficesDescription: function() {
      return `Automatically creates ${this.getCorporateOfficesIncrease} Recruiters and Factories per Corporate Office every ${this.corporateOfficesDelay / 1000} seconds.`; 
    },

    corporateOfficesPrice: function() {
      return this.round(this.corporateOfficesBasePrice + (this.corporateOffices ** 2));
    },

    getCorporateOfficesDelay: function() {
      return this.corporateOfficesDelay;
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

    getMailTruckDelay: function() {
      return this.mailTruckDelay;
    },

    getPostOfficeDelay: function() {
      return this.postOfficeDelay;
    },

    getMailmanDelay: function() {
      const caffeineDecrease = this.caffeine ? this.mailmanDelay * this.caffeineBoost : 0;
      const segwayDecrease = this.segway ? this.mailmanDelay * this.segwayMailmanBoost : 0;
      const dogTreatsDecrease = this.dogTreats ? this.mailmanDelay * this.dogTreatsBoost : 0;
      
      const delay = this.mailmanDelay - caffeineDecrease - segwayDecrease - dogTreatsDecrease;

      return delay;
    },

    getFactoryDelay: function() {
      const delay = this.factoryDelay / (this.scientificManagement ? 2 : 1);

      return delay;
    },

    getRecruiterDelay: function() {
      return this.recruiterDelay;
    },

    bootstrapInc: function() {
      let inc = this.bootstrapDelivery * this.multiplier ;
      return inc;
    },

    multiplier: function() {
      if(this.phase == 0)
        return 1;

      return Math.floor(2 ** (this.phase - 1)); 
    },

    postOfficePrice: function() {
      return this.round(this.postOfficeBasePrice + (this.postOffices ** 2.3));
    },

    bootstrapPrice: function() {
      return this.round(this.bootstrapBasePrice + (this.bootstrap ** 1.5))
    },

    mailTruckPrice: function() {
      return this.round(this.mailTruckBasePrice + (this.mailTrucks ** 1.8));
    },

    recruiterPrice: function() {
      return this.round(this.recruiterBasePrice + (this.recruiters ** 3));
    },

    factoryPrice: function() {
      return this.round(this.factoryBasePrice + (this.factories ** 2.5));
    },

    mailmanPrice: function() {
      return this.round(this.mailmanBasePrice + (this.mailmen ** 1.5));
    },

    mailboxPrice: function() {
      return this.round(this.mailboxBasePrice + (this.mailboxes ** 1.8));
    },

    autoreaderPrice: function() {
      return this.round(this.autoreaderBasePrice + ((this.autoreader / 10) ** 1.05)); 
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
        case 4:
          return this.phase5;
        case 5:
          return this.phase6;
        default:
          return Infinity;
      }
    },

    nextPhaseAvailable: function() {
      return this.lettersDelivered >= this.nextPhaseAt;
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
      if(this.phase != 9) {
        this.choosePowerups = true;
      } else {
        this.prestige();
      }
    }, 
  
    getLetter: function() {
      fetch(`/letters/${this.letterOn}.txt`)
        .then(resp => resp.text())
        .then(text => {
          this.letter = text;
        });
    },

    choose: function(name) {
      const chosen = this.powerups[name];
      if(chosen) {
        delete this.powerups[name];
        this.numChosen -= 1;
        if(this.numChosen < 0) {
          this.numChosen = 0;
        }
      } else {
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
      const letterOn = this.letterOn;

      for(const key in originalState) {
        this.$data[key] = originalState[key];
      }
  
      this.powerups = powerups;
      this.day = day;
      this.phase = phase + 1;
      this.lettersDelivered = lettersDelivered;
      this.letterOn = letterOn;

      if(this.phase == 10 && this.letterOn <= 4) {
        this.getLetter();
        this.readLetters = this.phase8; // Set letters to read to 1T otherwise it could get too big
        this.letterOn += 1;
        this.read = true;
      }
    },
 
    clickRead: function(amount) {
      if(this.readLetters <= 0)
        return;

      const inc = (amount && amount > 0 ? amount : 1);

      this.readLetters -= inc;
      this.curiosity += inc;

      if(this.readLetters < 0)
        this.readLetters = 0;
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
      this.money += ((this.getPricePerLetter) * this.multiplier) * amount;
      this.lettersDelivered += amount;

    },

    handleDebug: function() {
      this.lettersDelivered = 10 ** 15;
      this.money = 10 ** 15;
      this.readLetters = 1;
    },

    update: function() {
      const now = new Date();
      this.delta = now - new Date(this.lastTick);
      this.lastTick = now;

      if(!this.read) {
        this.updateAdvertisers();
        this.updateLetters();
        this.updateBreeder();
        this.updateMailboxes();
        this.updateMonopoly();
        this.updateCorporateOffices();
        this.updatePostOffices();
        this.updatePigeons();
        this.updateMailmen();
        this.updateMailTruck();
        this.updateRecruiters();
        this.updateFactories();
        this.updateLettersPerSecond();
        this.updateDeliveriesPerSecond(); 
      } else {
        this.updateAutoReader();
      }
      this.saveState();
    },

    generalUpdate,
    updateFactories,
    updateBreeder,
    updateLetters,
    updateRecruiters,
    updateMailmen,
    updateCorporateOffices,
    updateMonopoly,
    updateAutoReader,
    updatePigeons,
    updateMailTruck,
    updateMailboxes,
    updatePostOffices,
    updateAdvertisers,
    saveState,
    loadState,
    calculateNewState,
    newGame,
    buyMailman,
    buyAdvertisers,
    buyCorporateOffices,
    buyMailTruck,
    buyMailbox,
    buyRecruiter,
    buyFactory,
    buyPostOffice,
    buyMonopoly,
    buyBreeder,
    buyBootstrap,
    buyMaxAutoReader,
    buyAutoReader,
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

