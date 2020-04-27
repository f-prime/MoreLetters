import "dart:html";

class Button {
  final String name;
  final String description;
  final element = querySelector("#buttons");
  final String id;
  final onClick;
  final bool buyMax;
  
  Button({this.onClick, this.id, this.name, this.description, this.buyMax:false});

  void render() {
    this.element.innerHtml = """
        <div class="button" id="${this.id}">
          <div class="button-name">${name}</div>
          ${description != null ? '<div class="button-description">${description}</div>' : ''}
          ${buyMax ? '<div class="button-max-buy">(buy max)</div>' : ''}
        </div>
    """;

    querySelector("#${this.id}").onClick.listen(this.onClick);
  }
}
