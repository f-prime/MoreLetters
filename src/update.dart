import "buttons.dart";
import "stats.dart";
import "generators.dart";
import "state.dart" as state;
import "utils.dart";

void render() {
  deliverBtn.render();
  lettersStat.render();
  moneyStat.render();
  multiplierStat.render();

  state.prevState = Map.from(state.state);
  state.saveState();
}

void update() {
  if(!mapsAreEqual(state.prevState, state.state)) {
    render();
  }

  lettersGenerator.update(); 
}
