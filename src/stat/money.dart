import "dart:html";
import "../state.dart";

class MoneyStat {
  final element = querySelector("#money");

  void render() {
    element.innerHtml = "\$${state['money']}"; 
  }
}
