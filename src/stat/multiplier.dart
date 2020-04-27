import "dart:html";
import "../state.dart";

class MultiplierStat {
  final element = querySelector("#multiplier");

  void render() {
    element.innerHtml = "${state['multiplier']} multiplier"; 
  }
}
