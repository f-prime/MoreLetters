import "state.dart";

void deliveryAction() {
  if(state['letters'] > 0) {
    state['letters'] -= state['deliveryInc'] * state['multiplier'];
    state['money'] += state['pricePerLetter'] * state['multiplier'];
  }
}
