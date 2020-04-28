import "../state.dart";

class LettersGenerator {
  DateTime lastUpdate = DateTime.now();
  final int delay = 1000;
  
  void update() {
    final now = DateTime.now();
    final int difference = now.difference(lastUpdate).inMilliseconds;

    state['letters'] += (difference / delay) * state['multiplier'];
    
    lastUpdate = now;
  }
}
