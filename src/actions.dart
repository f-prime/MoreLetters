import "state.dart";

void deliveryAction({amount: 1}) {
  if(state['letters'] < amount) {
    return;
  }
  
  final delivered = amount * state['multiplier'];
  state['letters'] -= delivered;
  state['delivered'] += delivered; 
  state['money'] += delivered * state['pricePerLetter'] * state['multiplier'];
}
