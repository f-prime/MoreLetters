import "../state.dart";
import "../actions.dart";

class MailmanConsumer {
  DateTime lastUpdate = DateTime.now(); 
  final int delay = 750;

  void update() {
    if(state['mailmen'] <= 0)
      return;

    final diff = DateTime.now().difference(lastUpdate).inMilliseconds;
    final amount = diff / delay * state['multiplier'] * state['mailmen'];

    deliveryAction(amount: amount); 
    lastUpdate = DateTime.now();
  }
}
