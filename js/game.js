'use strict';

import { 
  originalState, 
  saveState, 
  loadState, 
  newGame,
  calculateNewState,
} from "./state.js";

import { 
  generalUpdate,
  updateMailware,
  updateBigNet,
  updatePostOffices,
  updateMailmen, 
  updateRecruiters,
  updateJets,
  updateMailDrones,
  updateEmail,
  updateMailTruck,
  updateAutoReader,
  updateFactories,
  updateLetters,
} from "./tick.js";

import { 
  buy,
  buyScientificManagement,
  buyMailware,
  buyAutoReader,
  buyMaxAutoReader,
  buySegway,
  buyJet,
  buyMailDrones,
  buySelfReliance,
  buyMailbox, 
  buyRecruiter,
  buyMailTruck,
  buyCaffeine,
  buyBigNet,
  buyInflation,
  buyEmail,
  buyLittleHelp,
  buyTwoHands,
  buyMailman,
  buySpontaneousGeneration,
  buyFactory,
  buyBootstrap,
  buyMailtruck,
  buyOneTime,
  buyPostOffice,
  buyMax,
  buyTwoForOne,
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
    'thisPhaseType',
    'phaseMin',
    'phase',
    'phaseType'
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
    <div v-if="(phaseType == thisPhaseType || thisPhaseType == 'either' )&& phase >= phaseMin" class="button column" @click='buy'>
      <div class="button-name">
        <div>{{ title }}</div>
        <div v-if="!owned && !curiosity">(\${{ price }})</div>
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

    mailmanDescription: function() {
      return `Mailmen deliver ${this.mailmanDelivery} ${this.mailmanDelivery > 1 ? 'letters' : 'letter'} per mailman automatically every ${this.round(this.mailmanDelay / 1000)} seconds.`;
    },
   
    mailboxDescription: function() {
      return `Increases number of letters per second by ${this.mailboxLettersIncrease}`;
    },

    bootstrapDescription: function() {
      return `Increases letters per click by ${this.bootstrapInc}`;
    },

    recruiterDescription: function() {
      return `Hires ${this.recruiterHire} mailmen per recruiter every ${this.recruiterDelay / 1000} seconds. Hiring does not cost money.`;
    },

    factoryDescription: function() {
      return `Generates ${this.factoryGenerate} ${this.factoryGenerate == 1 ? 'mailbox' : 'mailboxes'} per factory every ${this.factoryDelay / 1000} seconds`;
    },

    segwayDescription: function() {
      return `Increases mailman efficiency by ${this.segwayMailmanBoost * 100}% for every segway purchased.`
    },

    scientificManagementDescription: function() {
      return "Reduces the time it take for factories to generate mailboxes by 50%.";
    },

    twoHandsDescription: function() {
      return `Each delivery click has a ${this.twoHandsChance * 100}% chance of deliverying ${this.twoHandsMultiplier}x the amount of letters.`
    },

    postOfficeDescription: function() {
      return `Generates two letters every ${this.postOfficeDelay / 1000} seconds.`;
    },

    mailTruckDescription: function() {
      return `Automatically delivers ${this.mailTruckInc} letters every ${this.mailTruckDelay / 1000} seconds`;
    },

    emailDescription: function() {
      return `Accept letters via the internet. Generates ${this.emailInc} letters every ${this.emailDelay / 1000} seconds`;
    },

    littleHelpDescription: function() {
      return `${this.littleHelpChance * 100}% chance of hiring a mailman every delivery click.`;
    },

    bigNetDescription: function() {
      return `Capture all the messages in bottles that are floating around the ocean. Generates ${this.bigNetInc} letters every ${this.bigNetDelay / 1000} seconds.`;
    },

    selfRelianceDescription: function() {
      return `Increases bootstrap increment by ${this.selfRelianceInc}.`;
    },

    inflationDescription: function() {
      return `Increases the price per letter by ${this.inflationIncrease * 100}%.`;
    },

    mailwareDescription: function() {
      return `Infect people's computers and phones with 'mailware' capturing letters before they are even sent! Generates ${this.mailwareInc} letters per tick.`;
    },

    mailDronesDescription: function() {
      return `Unlease a swarm of mail delivering drones. Delivers ${this.mailDronesDelivery} letters every ${this.mailDronesDelay / 1000} seconds.`;
    },

    jetsDescription: function() {
      return `Jets deliver ${this.jetDelivery} letters every ${this.jetDelay / 1000} seconds.`;
    },

    spontaneousGenerationDescription: function() {
      return `${this.spontaneousGenerationChance * 100}% chance that clicking to deliver a letter will multiply your letters per click by ${this.spontaneousGenerationMult} for that click.`;
    },

    postOfficDescription: function() {
      return `Generates two letters every ${this.postOfficeDelay / 1000} seconds.`;
    },

    caffeineDescription: function() {
      return `Every mailman gets put on a madatory drip of high octane espresso. Increases mailman efficiency by ${this.caffeineBoost * 100}%`
    },
   
    bootstrapInc: function() {
      let inc = this.bootstrapDelivery * this.multiplier * (this.twoForOne ? 2 : 1);
      if(this.selfReliance)
        inc += this.selfRelianceInc;

      return inc;
    },

    multiplier: function() {
      if(this.phase == 0)
        return 1;

      return 2 ** (this.phase - 1); 
    },

    jetPrice: function() {
      return this.round(this.jetBasePrice + (this.jets ** 2));
    },

    postOfficePrice: function() {
      return this.round(this.postOfficeBasePrice + (this.postOffices ** 4));
    },

    bootstrapPrice: function() {
      return this.round(this.bootstrapBasePrice + (this.bootstrap ** 2))
    },

    mailTruckPrice: function() {
      return this.round(this.mailTruckBasePrice + (this.mailTrucks ** 2.2));
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
        case 6:
          return this.phase7;
        default:
          return Infinity;
      }
    },

    nextPhaseAvailable: function() {
      return this.lettersDelivered >= this.nextPhaseAt;
    }
  },

  methods: {
    isActivePlayer: function() {
      return this.bootstrap >= this.isActiveBootstrap && this.clickDelivery >= this.isActiveClick;
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

      const lettersDelivered = this.lettersDelivered;
      const phase = this.phase;
      const phaseType = this.phaseType;
      const playType = this.isActivePlayer() ? 'active' : 'idle'; 
      const day = this.day;

      for(const key in originalState) {
        this.$data[key] = originalState[key];
      }

      this.day = day;
      this.phase = phase + 1;
      this.phaseType = phaseType;
      this.phaseType[phase] = playType;
      this.lettersDelivered = lettersDelivered;
      
      if(this.phase == 7) {
        this.readLetters = 10**9; // Set letters to read to 1T otherwise it could get too big
        this.read = true;
      }

      console.log(this.phase, this.phaseType);
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
     

      const twoHandsMult = this.twoHands && Math.random() < this.twoHandsChance ? this.twoHandsMultiplier : 1;
      const spontGen = this.spontaneousGeneration && Math.random() < this.spontaneousGenerationChance ? this.spontaneousGenerationMult : 1;
      
      console.log("2 Hands", twoHandsMult);
      console.log("Spont Gen", spontGen);
      
      if(this.littleHelp) {
        const littleHelp = Math.random();
        if(littleHelp < this.littleHelpChance) {
          this.mailmen += 1;
        }
      }
      
      this.deliverLetter(Math.ceil(this.clickInc) * twoHandsMult * spontGen);
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

      if(!this.read) {
        this.updateLetters();
        this.updateJets();
        this.updateEmail();
        this.updateMailDrones(),
        this.updateMailware();
        this.updateBigNet();
        this.updatePostOffices();
        this.updateMailmen();
        this.updateMailTruck();
        this.updateRecruiters();
        this.updateFactories();
      } else {
        this.updateAutoReader();
      }
      this.saveState();
    },

    generalUpdate,
    updateFactories,
    updateLetters,
    updateRecruiters,
    updateMailmen,
    updateEmail,
    updateAutoReader,
    updateMailware,
    updateBigNet,
    updateMailTruck,
    updateJets,
    updateMailDrones,
    updatePostOffices,
    saveState,
    loadState,
    calculateNewState,
    newGame,
    buyScientificManagement,
    buyMailman,
    buyMailDrones,
    buyJet,
    buyMailTruck,
    buyMailbox,
    buyInflation,
    buyRecruiter,
    buyFactory,
    buyMailtruck,
    buyPostOffice,
    buySegway,
    buyBigNet,
    buySpontaneousGeneration,
    buyBootstrap,
    buyTwoHands,
    buyTwoForOne,
    buyLittleHelp,
    buyMaxAutoReader,
    buyCaffeine,
    buyAutoReader,
    buySelfReliance,
    buyEmail,
    buyMailware,
    buyOneTime,
    buy,
    buyMax,
  },

  created: function() {
    console.log("I know you're a 1337 h4x0r and all, but isn't it more fun to... you know... play the game?");
    this.loadState();
    setInterval(this.update, 0);
  }

});

