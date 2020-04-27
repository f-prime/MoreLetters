import "../state.dart";

class LettersGenerator {
  DateTime lastUpdate = DateTime.now();
  final int delay = 1000;
  
  void update() {
    final now = DateTime.now();
    final int difference = now.difference(lastUpdate).inMilliseconds;

    if(difference >= delay) {
      state['letters'] += 1;
      lastUpdate = now;
    }
  }
}
