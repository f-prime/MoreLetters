import "dart:html";
import 'dart:convert';

DateTime lastSave = DateTime.now();

Map<int, int> nextPhaseAt = {
  1: 50,
};

Map<String, dynamic> state = {
  "letters": 0,
  "money":0,
  "phase":0,
  "multiplier":1,
  "mailmen":0,
  "delivered":0,
  "pricePerLetter":0.25,
  "choosePowerups": false,
  "claimPowerups": false,
};

Map<String, dynamic> prevState = {};

void saveState() {
  if(DateTime.now().difference(lastSave).inMilliseconds > 1000) {
    window.localStorage['state'] = jsonEncode(state); 
    lastSave = DateTime.now();
  } 
}

void loadState() {
  if(window.localStorage['state'] == null)
    return;

  Map loaded = jsonDecode(window.localStorage['state']);
  
  for(String key in loaded.keys) {
    if(loaded[key] != null) {
      state[key] = loaded[key];
    }
  }
}
