import "state.dart";

double round(number, {places: 2}) {
  number = (number * 100).round() / 100;
  return number;
}


bool nextPhaseAvailable() {
  final int nextPhase = nextPhaseAt[state['phase'] + 1];

  return nextPhase != null && nextPhase <= state['delivered'];
}

bool mapsAreEqual(Map<String, dynamic> a, Map<String, dynamic> b) {
  if(a.keys.length != b.keys.length) {
    return false; 
  }

  for(var key in a.keys) {
    if(b[key] != a[key]) {
      return false;
    }
  }

  return true;
}
