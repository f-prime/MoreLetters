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
} from "./tick.js";

import { 
  buy,
  buyScientificManagement,
  buySegway,
  buyMailbox, 
  buyRecruiter,
  buyTwoHands,
  buyMailman,
  buyFactory,
  buyBootstrap,
  buyMailtruck,
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
      return this.bootstrap >= this.isActiveBootstrap && this.clickDelivery >= this.isActiveClick;
    },
    
    multiplier: function() {
      if(this.phase == 0)
        return 1;

      return 2 ** (this.phase - 1); 
    },
  
    bootstrapPrice: function() {
      return this.round(this.bootstrapBasePrice + (this.bootstrap ** 2))
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
        case 3:
          return this.phase3;
        case 4:
          return this.phase4;
        case 5:
          return this.phase5;
        case 6:
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
      const phaseType = this.phaseType;
      const playType = this.isActivePlayer ? 'active' : 'idle'; 

      for(const key in originalState) {
        this.$data[key] = originalState[key];
      }

      this.phase = phase + 1;
      this.phaseType = phaseType;
      this.phaseType[phase] = playType;
      this.lettersDelivered = lettersDelivered;
      console.log(JSON.stringify(this.$data))
    },
  
    clickDeliver: function() {
      if(this.letters == 0)
        return;
      
      const twoHandsMult = Math.random() < this.twoHandsChance ? this.twoHandsMultiplier : 1;
      this.deliverLetter(Math.ceil(this.clickInc) * twoHandsMult);
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
      this.saveState();
    },

    updateFactories,
    updateLetters,
    updateRecruiters,
    updateMailmen,
    updateState,
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
    buyTwoHands,
    buy,
    buyMax,
  },

  created: function() {
    console.log("I know you're a 1337 h4x0r and all, but isn't it more fun to... you know... play the game?");
    this.loadState();
    setInterval(this.update, 0);
  }

});

