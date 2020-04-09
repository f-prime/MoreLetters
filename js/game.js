const vw = new Vue({
  el:"#app",
  
  data: {
    phase:0,

    multiplier: 1,
    lettersInc: 1,
    lettersDelay: 1000,
    letters: 0,
    lettersDelivered: 0,
    lastLettersUpdate: new Date(),
   
    mailmen: 0,
    mailmanBasePrice: 10, 
    lastMailmanDelivery: new Date(),
    mailmanDeliveryDelay: 500,

    mailboxBasePrice: 10,
    mailboxes: 0,

    pricePerLetter: 0.25,
    money: 0,

    lastSave: new Date(),
  },
 
  computed: {
    lettersPerSecond: function() {
      return this.round((this.lettersInc * (this.mailboxes + 1)) / (this.lettersDelay / 1000));
    },

    mailmanPrice: function() {
      return this.round(this.mailmanBasePrice + (this.mailmen ** 1.15));
    },

    mailboxPrice: function() {
      return this.round(this.mailboxBasePrice + (this.mailboxes ** 1.3));
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
   
    buyMailman: function() {
      /*
       * Automates letter delivery
       * Delivers once ever 500ms
       * Delivers one letter per mailman
       * Reduces delivery delay by 2%
       *
       */

      const price = this.mailmanPrice;

      if(this.money < price)
        return;

      this.mailmen += 1;
      this.mailmanDeliveryDelay -= this.mailmanDeliveryDelay * 0.02
      this.money -= price;
    },

    buyMailbox: function() {
      /*
       * Increases number of letters per second by one
       * Decreases letters delay by 2%
       */

      const price = this.mailboxPrice;

      if(this.money < price)
        return;

      this.mailboxes += 1;
      this.lettersDelay -= (this.lettersDelay * 0.02);
      this.money -= price;
    },

    prestige: function() {

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

    updateLetters: function() {
      const now = new Date();
      if(now - new Date(this.lastLettersUpdate) < this.lettersDelay) {
        return;
      }

      this.letters += (this.lettersInc * (this.mailboxes + 1)) * this.multiplier;
      this.lastLettersUpdate = new Date();
    },

    updateMailmen: function() {
      if(this.mailmen <= 0)
        return;

      const now = new Date();

      if(now - new Date(this.lastMailmanDelivery) > this.mailmanDeliveryDelay) {
        this.deliverLetter(this.mailmen);
        this.lastMailmanDelivery = now;
      }
    },

    updateState: function() {
      switch(this.phase) {
        case 0: {
          if(this.lettersDelivered > 40) {
            this.phase = 1;
          }
        }
      }
    },

    saveState: function() {
      const now = new Date();
      if(now - new Date(this.lastSave) > 1000) {
        localStorage.setItem("state", JSON.stringify(this.$data));
        this.lastSave = now;
      }
    },

    loadState: function() {
      const state = localStorage.getItem("state");
      if(!state)
        return;

      const json = JSON.parse(state);
      
      for(const key in json) {
        this.$data[key] = json[key];
      } 
    },

    newGame: function() {
      localStorage.removeItem("state");
      window.location.reload();
    },

    update: function() {
      this.updateLetters();
      this.updateMailmen();
      this.updateState();
      this.saveState();
    }
  },

  created: function() {
    console.log("I know you're a 1337 h4x0r and all, but isn't it more fun to... you know... play the game?");
    this.loadState();
    setInterval(this.update, 0);
  }

});

