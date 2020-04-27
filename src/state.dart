import "dart:html";
import 'dart:convert';

Map<String, double> state = {
  "letters": 0,
  "money":0,
  "phase":0,
  "multiplier":1,
  "deliveryInc":1,
  "pricePerLetter":0.25,
};

Map<String, double> prevState = {};

void saveState() {
  window.localStorage['state'] = jsonEncode(state);  
}

void loadState() {
  Map loaded = jsonDecode(window.localStorage['state']);

  Map<String, double> output = {};

  for(var key in loaded.keys) {
    output[key] = loaded[key];
  }

  state = output;
}
