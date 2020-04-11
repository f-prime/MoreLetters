import { 
  originalState, 
  saveState, 
  loadState, 
  newGame,
  calculateNewState,
} from "./state.js";

import { 
  generalUpdate,
  updateState, 
  updateMailmen, 
  updateRecruiters,
  updateFactories,
  updateLetters 
} from "./tick.js";

import { 
  buy,
  buyScientificManagement,
  buySegway,
  buyMailbox, 
  buyRecruiter, 
  buyMailman,
  buyFactory,
  buyMailtruck,
  buyPostOffice,
  buyMax,
} from "./buy.js";



const vw = new Vue({
  el:"#app",
  
  data: Object.assign({}, originalState), 
 
  computed: {
    multiplier: function() {
      if(this.phase == 0)
        return 1;

      return 2 ** (this.phase - 1); 
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
          return 40;
        case 1:
          return 100000;
        case 2:
          return 100000000;
        default:
          return Infinity;
      }
    },

    nextPhaseAvailable: function() {
      switch(this.phase) {
        case 1: {
          return this.lettersDelivered >= 100000; 
        }

        case 2: {
          return this.lettersDelivered >= 1000000;
        }
      }

      return false;
    }
  },

  methods: {
    getFormatted: function(number, divisor) {
      const result = (number / divisor).toString().match(/[0-9]+\.?[0-9]?[0-9]?/g);
      return result[0];
    },

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
    generalUpdate,
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
    buy,
    buyMax,
  },

  created: function() {
    console.log("I know you're a 1337 h4x0r and all, but isn't it more fun to... you know... play the game?");
    this.loadState();
    setInterval(this.update, 0);
  }

});

