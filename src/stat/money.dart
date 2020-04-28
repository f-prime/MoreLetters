import "dart:html";
import "../state.dart";
import "../utils.dart";

class MoneyStat {
  final element = querySelector("#money");

  void render() {
    element.innerHtml = "\$${round(state['money'])}"; 
  }
}
