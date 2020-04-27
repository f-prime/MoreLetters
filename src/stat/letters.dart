import "dart:html";
import "../state.dart";

class LettersStat {
  final element = querySelector("#letters");

  void render() {
    element.innerHtml = "${state['letters']} letters"; 
  }
}
