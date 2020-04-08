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
  },
 
  computed: {
    lettersPerSecond: function() {
      return this.round(this.lettersInc / (this.lettersDelay / 1000));
    },

    mailmanPrice: function() {
      return this.round(this.mailmanBasePrice + (this.mailmen ** 1.15));
    },

    mailboxPrice: function() {
      return this.round(this.mailboxBasePrice + (this.mailboxes ** 1.3));
    }
  },

  methods: {
    round: function(number) {
      number *= 100;
      return Math.floor(number) / 100;
    },
   
    buyMailman: function() {
      const price = this.mailmanPrice;

      if(this.money < price)
        return;

      this.mailmen += 1;
      this.money -= price;
    },

    buyMailbox: function() {
      const price = this.mailboxPrice;

      if(this.money < price)
        return;

      this.mailboxes += 1;
      this.money -= price;
    },

    deliverLetter: function(amount) {
      amount = amount || 1;

      if(this.letters >= amount) {
        this.letters -= amount;
        this.money += (this.pricePerLetter * this.multiplier) * amount;
        this.lettersDelivered += amount;
      }
    },

    updateLetters: function() {
      const now = new Date();
      if(now - this.lastLettersUpdate < this.lettersDelay) {
        return;
      }

      this.letters += (this.lettersInc * (this.mailboxes + 1)) * this.multiplier;
      this.lastLettersUpdate = new Date();
    },

    updateMailmen: function() {
      if(this.mailmen <= 0)
        return;

      const now = new Date();

      if(now - this.lastMailmanDelivery > this.mailmanDeliveryDelay) {
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

    update: function() {
      this.updateLetters();
      this.updateMailmen();
      this.updateState();
    }
  },

  created: function() {
    setInterval(this.update, 0);
  }

});

