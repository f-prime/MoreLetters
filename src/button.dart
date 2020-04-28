import "dart:html";
import "state.dart";

class Button {
  final String name;
  final String description;
  final String element;
  final String id;
  final onClick;
  final bool buyMax;
  final List<String> watchers;
  Map<String, dynamic> prevState = {};
  bool first = true;

  Button({
    this.onClick, 
    this.id, 
    this.name, 
    this.description,
    this.element,
    this.buyMax:false,
    this.watchers: const [],
  });

  bool reRender() {
    bool output = false;

    for(String key in watchers) {
      if(prevState[key] != state[key]) {
        output = true;
        prevState[key] = state[key];
      }
    }
    
    return output;    
  }

  void render() {
    if(!this.reRender() && !first)
      return;

    first = false;

    querySelector("#${this.element}").innerHtml = """
        <div class="button" id="${this.id}">
          <div class="button-name">${name}</div>
          ${description != null ? '<div class="button-description">${description}</div>' : ''}
          ${buyMax ? '<div class="button-max-buy">(buy max)</div>' : ''}
        </div>
    """;

    querySelector("#${this.id}").onClick.listen(this.onClick);
  }
}
