import { originalState, saveState, loadState, newGame } from "./state.js";

import { 
  updateState, 
  updateMailmen, 
  updateRecruiters,
  updateFactories,
  updateLetters 
} from "./tick.js";

import { 
  buyMailbox, 
  buyRecruiter, 
  buyMailman,
  buyFactory,
  buyMailtruck,
  buyPostOffice,
} from "./buy.js";



const vw = new Vue({
  el:"#app",
  
  data: Object.assign({}, originalState), 
 
  computed: {
    recruiterPrice: function() {
      return this.round(this.recruiterBasePrice + (this.recruiters ** 1.5));
    },

    factoryPrice: function() {
      return this.round(this.factoryBasePrice + (this.factories * 1.7));
    },

    lettersPerSecond: function() {
      return this.round((this.lettersInc * (this.mailboxes + 1)) / (this.lettersDelay / 1000));
    },

    mailmanPrice: function() {
      return this.round(this.mailmanBasePrice + (this.mailmen ** 1.15));
    },

    mailboxPrice: function() {
      return this.round(this.mailboxBasePrice + (this.mailboxes ** 1.3));
    },

    nextPhaseAt: function() {
      switch(this.phase) {
        case 0:
          return "40";
        case 1:
          return "10,000";
        default:
          return "Infinity";
      }
    },

    nextPhaseAvailable: function() {
      switch(this.phase) {
        case 1: {
          return this.lettersDelivered >= 10000; 
        }
      }

      return false;
    }
  },

  methods: {
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
      this.multiplier = 2 ** this.phase;
      this.lettersDelivered = lettersDelivered;
    },

    deliverLetter: function(amount) {
      /*
       * Delivers N amount of letters if possible
       */

      if(this.letters >= amount) {
        this.letters -= amount;
        this.money += (this.pricePerLetter * this.multiplier) * amount;
        this.lettersDelivered += amount;
      }
    },

    update: function() {
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
    newGame,
    buyMailman,
    buyMailbox, 
    buyRecruiter,
    buyFactory,
    buyMailtruck,
    buyPostOffice,

  },

  created: function() {
    console.log("I know you're a 1337 h4x0r and all, but isn't it more fun to... you know... play the game?");
    this.loadState();
    setInterval(this.update, 0);
  }

});

