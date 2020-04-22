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
  updateMailware,
  updateBigNet,
  updatePostOffices,
  updateMailmen, 
  updateRecruiters,
  updatePigeons,
  updateJets,
  updateMailDrones,
  updateEmail,
  updateMailTruck,
  updateMailboxes,
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
  buyPigeons,
  buyBoxMod,
  buyDogTreats,
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
    <div class="button column" :class="isChosen ? 'chosen' : ''"  @click='action'>
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
  
  data: Object.assign({scrolled: false}, originalState), 
 
  computed: {
    autoreaderDescription: function() {
      return `Auto reads letters.`;
    },

    mailmanDescription: function() {
      return `Mailmen deliver ${this.mailmanDelivery} ${this.mailmanDelivery > 1 ? 'letters' : 'letter'} per mailman automatically every ${this.round(this.getMailmanDelay / 1000)} seconds.`;
    },
   
    mailboxDescription: function() {
      return `Generates ${this.getMailboxLettersInc} letter per mailbox every ${this.getMailboxDelay / 1000} seconds.`
    },

    bootstrapDescription: function() {
      return `Increases letters per click by ${this.bootstrapInc}`;
    },

    recruiterDescription: function() {
      return `Hires ${this.recruiterHire} mailmen per recruiter every ${this.getRecruiterDelay / 1000} seconds. Hiring does not cost money.`;
    },

    factoryDescription: function() {
      return `Generates ${this.factoryGenerate} ${this.factoryGenerate == 1 ? 'mailbox' : 'mailboxes'} per factory every ${this.getFactoryDelay / 1000} seconds. These mailboxes do not cost anything.`;
    },

    segwayDescription: function() {
      return `Increases mailman efficiency by ${this.segwayMailmanBoost * 100}% for every segway purchased.`
    },

    scientificManagementDescription: function() {
      return "Reduces the time it take for factories to generate mailboxes by 50%.";
    },

    twoHandsDescription: function() {
      return `Each delivery click has a ${this.twoHandsChance * 100}% chance of delivering ${this.twoHandsMultiplier}x the amount of letters.`
    },

    postOfficeDescription: function() {
      return `Generates two letters every ${this.getPostOfficeDelay / 1000} seconds.`;
    },

    mailTruckDescription: function() {
      return `Automatically delivers ${this.mailTruckInc} letters every ${this.getMailTruckDelay / 1000} seconds`;
    },

    emailDescription: function() {
      return `Accept letters via the internet. Generates ${this.emailInc} letters every ${this.getEmailDelay / 1000} seconds`;
    },

    littleHelpDescription: function() {
      return `${this.littleHelpChance * 100}% chance of hiring a mailman every delivery click.`;
    },

    bigNetDescription: function() {
      return `Capture all the messages in bottles that are floating around the ocean. Generates ${this.bigNetInc} letters every ${this.getBigNetDelay / 1000} seconds.`;
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
      return `Unleash a swarm of mail delivering drones. Delivers ${this.mailDronesDelivery} letters every ${this.getMailDronesDelay / 1000} seconds.`;
    },

    jetsDescription: function() {
      return `Jets deliver ${this.jetDelivery} letters every ${this.getJetDelay / 1000} seconds.`;
    },

    spontaneousGenerationDescription: function() {
      return `${this.spontaneousGenerationChance * 100}% chance that clicking to deliver a letter will multiply your letters per click by ${this.spontaneousGenerationMult} for that click.`;
    },

    postOfficDescription: function() {
      return `Generates two letters every ${this.getPostOfficeDelay / 1000} seconds.`;
    },

    caffeineDescription: function() {
      return `Every mailman gets put on a madatory drip of high octane espresso. Decreases mailman delivery delay by ${this.caffeineBoost * 100}%`
    },

    pigeonsDescription: function() {
      return `Pigeons deliver ${this.getPigeonsDelivery} letters every ${this.getPigeonsDelay / 1000} seconds.`; 
    },

    dogTreatsDescription: function() {
      return `Use to stave off the angry dogs on the block. Decreases mailman delivery delay by ${this.dogTreatsBoost * 100}%`;
    },

    boxModDescription: function() {
      return `Increase the number of letters per second produced by a mailbox by ${this.boxModBoost}.`; 
    },

    getPigeonsDelivery: function() {
      return this.pigeonDelivery;
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

    getBigNetDelay: function() {
      return this.bigNetDelay;
    },

    getMailDronesDelay: function() {
      return this.mailDronesDelay;
    },

    getMailwareDelay: function() {
      return this.mailwareDelay;
    },

    getEmailDelay: function() {
      return this.emailDelay;
    },

    getMailTruckDelay: function() {
      return this.mailTruckDelay;
    },

    getPostOfficeDelay: function() {
      return this.postOfficeDelay;
    },

    getMailmanDelay: function() {
      const caffeineDecrease = this.caffeine ? (this.mailmanDelay - (this.mailmanDelay * this.caffeineBoost)) : 0;
      const segwayDecrease = this.segways * this.segwayMailmanBoost;
      const dogTreatsDecrease = this.dogTreats ? this.mailmanDelay * this.dogTreatsBoost : 0;
      
      const delay = this.mailmanDelay - caffeineDecrease - segwayDecrease - dogTreatsDecrease;

      return delay;
    },

    getFactoryDelay: function() {
      const delay = this.factoryDelay / (this.scientificManagement ? 2 : 1);

      return delay;
    },

    getJetDelay: function() {
      return this.jetDelay;
    },

    getRecruiterDelay: function() {
      return this.recruiterDelay;
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

    pigeonsPrice: function() {
      return this.round(this.pigeonsBasePrice + (this.pigeons ** 1.1));
    },

    jetPrice: function() {
      return this.round(this.jetBasePrice + (this.jets ** 2));
    },

    postOfficePrice: function() {
      return this.round(this.postOfficeBasePrice + (this.postOffices ** 1.5));
    },

    bootstrapPrice: function() {
      return this.round(this.bootstrapBasePrice + (this.bootstrap ** 2))
    },

    mailTruckPrice: function() {
      return this.round(this.mailTruckBasePrice + (this.mailTrucks ** 1.8));
    },

    recruiterPrice: function() {
      return this.round(this.recruiterBasePrice + (this.recruiters ** 3));
    },

    segwayPrice: function() {
      return this.round(this.segwayBasePrice + (this.segways ** 3));
    },

    factoryPrice: function() {
      return this.round(this.factoryBasePrice + (this.factories ** 2.5));
    },

    lettersPerSecond: function() {
      return this.round((this.lettersInc * this.multiplier * (this.mailboxes + 1)) / (this.getLettersDelay / 1000));
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
        case 7:
          return this.phase8;
        // Phase 8 is a read so it is the same upper bound as 7
        case 8:
          return this.phase8;
        case 9:
          return this.phase10;
        default:
          return Infinity;
      }
    },

    nextPhaseAvailable: function() {
      return this.lettersDelivered >= this.nextPhaseAt;
    }
  },

  methods: {
    handleScrolled: function() {
      this.scrolled = window.scrollY > 100;
    },

    nextPhase: function() {
      if(this.letterPhases.indexOf(this.phase) == -1 && this.phase !== this.lastPhase) {
        this.choosePowerups = true;
      } else {
        this.prestige();
      }
    }, 
  
    getLetter: function() {
      fetch(`/letters/${this.phase}.json`)
        .then(resp => resp.json())
        .then(json => {
          this.letterHeader = json.header;
          this.letterBody = json.body;
          this.letterFooter = json.footer;
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

      for(const key in originalState) {
        this.$data[key] = originalState[key];
      }
  
      this.powerups = powerups;
      this.day = day;
      this.phase = phase + 1;
      this.lettersDelivered = lettersDelivered;
      
      if(this.phase == 8) {
        this.getLetter();
        this.readLetters = this.phase8; // Set letters to read to 1T otherwise it could get too big
        this.read = true;
      } else if(this.phase == 12) {
        this.getLetters();
        this.readLetters = this.phase10;;
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
     

      const twoHandsMult = this.twoHands && Math.random() < this.twoHandsChance ? this.twoHandsMultiplier : 1;
      const spontGen = this.spontaneousGeneration && Math.random() < this.spontaneousGenerationChance ? this.spontaneousGenerationMult : 1;
     
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
      this.money += ((this.getPricePerLetter) * this.multiplier) * amount;
      this.lettersDelivered += amount;

    },

    update: function() {
      const now = new Date();
      this.delta = now - new Date(this.lastTick);
      this.lastTick = now;

      if(!this.read) {
        this.updateLetters();
        this.updateMailboxes();
        this.updateJets();
        this.updateEmail();
        this.updateMailDrones(),
        this.updateMailware();
        this.updateBigNet();
        this.updatePostOffices();
        this.updatePigeons();
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
    updatePigeons,
    updateBigNet,
    updateMailTruck,
    updateJets,
    updateMailDrones,
    updateMailboxes,
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
    buyBoxMod,
    buyPigeons,
    buyDogTreats,
    buyMailware,
    buyOneTime,
    buy,
    buyMax,
    setupTests,
  },

  created: function() {
    document.addEventListener("scroll", this.handleScrolled);

    this.setupTests(),
    this.loadState();
    setInterval(this.update, 0);
  }

});

