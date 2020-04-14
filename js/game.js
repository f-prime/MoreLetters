'use strict';

import { 
  originalState, 
  saveState, 
  loadState, 
  newGame,
  calculateNewState,
} from "./state.js";

import { 
  updateState, 
  updateMailmen, 
  updateRecruiters,
  updateFactories,
  updateLetters,
  updateDogs,
} from "./tick.js";

import { 
  buy,
  buyScientificManagement,
  buySegway,
  buyMailbox, 
  buyRecruiter, 
  buyMailman,
  buyFactory,
  buyBootstrap,
  buyMailtruck,
  buyPostOffice,
  buyDogTreats,
  buyMax,
} from "./buy.js";

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
  ],
  
  methods: {
    buy: function() {
      this.$emit("buy");
    },

    buyMax: function() {
      this.$emit("buy-max");
    }
  },

  template: `
    <div class="button column" @click='buy'>
      <div class="button-name">
        <div>{{ title }}</div>
        <div v-if="!owned">(\${{ price }})</div>
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
    isActivePlayer: function() {
      return this.bootstrap >= 15 && this.clickDelivery >= 200;
    },
    
    multiplier: function() {
      if(this.phase == 0)
        return 1;

      return 2 ** (this.phase - 1); 
    },
  
    bootstrapPrice: function() {
      return this.round(this.bootstrapBasePrice + (this.bootstrap ** 2))
    },

    dogTreatsPrice: function() {
      return this.round(this.dogTreatsBasePrice + (this.dogTreats ** 1.05));
    },

    recruiterPrice: function() {
      return this.round(this.recruiterBasePrice + (this.recruiters ** 2));
    },

    segwayPrice: function() {
      return this.round(this.segwayBasePrice + (this.segways ** 5));
    },

    factoryPrice: function() {
      return this.round(this.factoryBasePrice + (this.factories ** 2.2));
    },

    lettersPerSecond: function() {
      return this.round((this.lettersInc * this.multiplier * (this.mailboxes + 1)) / (this.lettersDelay / 1000));
    },

    mailmanPrice: function() {
      return this.round(this.mailmanBasePrice + (this.mailmen ** 1.5));
    },

    mailboxPrice: function() {
      return this.round(this.mailboxBasePrice + (this.mailboxes ** 1.8));
    },

    nextPhaseAt: function() {
      switch(this.phase) {
        case 0:
          return this.phase0;
        case 1:
          return this.phase1;
        case 2:
          return this.phase2;
        default:
          return Infinity;
      }
    },

    nextPhaseAvailable: function() {
      switch(this.phase) {
        case 1: {
          return this.lettersDelivered > this.phase1; 
        }

        case 2: {
          return this.lettersDelivered > this.phase2;
        }
      }

      return false;
    }
  },

  methods: {
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
        return this.getFormatted(number, 10**9) + "g";
      } else if (number < 10**15) {
        return this.getFormatted(number, 10**12) + "t";
      } else if (number < 10**18) {
        return this.getFormatted(number, 10**15) + "p";
      } else if (number == Infinity) {
        return "Infinity";
      }

      return this.getFormatted(number, 10**15) + "e";
    },

    round: function(number) {
      number *= 100;
      return Math.floor(number) / 100;
    },
   
    prestige: function() {
      if(!this.nextPhaseAvailable)
        return;

      const lettersDelivered = this.lettersDelivered;
      const phase = this.phase;

      for(const key in originalState) {
        this.$data[key] = originalState[key];
      }

      this.phase = phase + 1;
      this.lettersDelivered = lettersDelivered;
    },
  
    clickDeliver: function() {
      if(this.letters == 0)
        returnl

      this.deliverLetter(Math.ceil(this.clickInc));
      this.clickDelivery += 1;

    },

    deliverLetter: function(amount) {
      /*
       * Delivers N amount of letters if possible
       */

      if(this.letters < amount) {
        amount = this.letters;
      }

      this.letters -= amount;
      this.money += (this.pricePerLetter * this.multiplier) * amount;
      this.lettersDelivered += amount;

    },

    update: function() {
      const now = new Date();
      this.delta = now - new Date(this.lastTick);
      this.lastTick = now;

      this.updateLetters();
      this.updateMailmen();
      this.updateRecruiters();
      this.updateFactories();
      this.updateState();
      this.updateDogs();
      this.saveState();
    },

    updateFactories,
    updateLetters,
    updateRecruiters,
    updateMailmen,
    updateState,
    updateDogs,
    saveState,
    loadState,
    calculateNewState,
    newGame,
    buyScientificManagement,
    buyMailman,
    buyMailbox, 
    buyRecruiter,
    buyFactory,
    buyMailtruck,
    buyPostOffice,
    buySegway,
    buyBootstrap,
    buyDogTreats,
    buy,
    buyMax,
  },

  created: function() {
    console.log("I know you're a 1337 h4x0r and all, but isn't it more fun to... you know... play the game?");
    this.loadState();
    setInterval(this.update, 0);
  }

});

