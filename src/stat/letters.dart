import "dart:html";
import "../state.dart";
import "../utils.dart";

class LettersStat {
  final element = querySelector("#letters");

  void render() {
    element.innerHtml = "letters: ${round(state['letters'])}"; 
  }
}
