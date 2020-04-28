import "buttons.dart";
import "stats.dart";
import "generators.dart";
import "consumers.dart";
import "state.dart";
import "utils.dart";
import "elements.dart";

void render() {
  deliverBtn.render();
  lettersStat.render();
  moneyStat.render();
  multiplierStat.render();
  deliveredStat.render();

  if(state['choosePowerups']) {
    phase1Powerups.render();
  } else if(nextPhaseAvailable()) {
    nextPhaseBtn.render();
  } else if(!state['choosePowerups']) {
    nextPhaseAtElm.render();
  }

  saveState();
}

void update() {
  render();
  
  if(!nextPhaseAvailable()) {
    lettersGenerator.update();
    mailmanConsumer.update();
  }

}
