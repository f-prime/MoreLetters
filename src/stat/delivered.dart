import "dart:html";
import "../state.dart";
import "../utils.dart";

class DeliveredStat {
  final element = querySelector("#delivered");

  void render() {
    element.innerHtml = "letters delivered: ${round(state['delivered'])}"; 
  }
}
