import "dart:html";
import "../state.dart";

class NextPhaseAtElm {
  final element = querySelector("#next-phase-at");
  
  void render() {
    this.element.innerHtml = """
Next phase available at ${nextPhaseAt[state['phase'] + 1]} letters delivered.
    """;
  }
}
