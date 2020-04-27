import "dart:async";
import "src/update.dart";
import "src/state.dart";

void main() {
  loadState();
  Timer.periodic(
    const Duration(milliseconds: 0),
    (timer) {
      update();      
    }
  );  
}
