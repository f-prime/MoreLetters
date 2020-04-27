import "button.dart";
import "actions.dart";

final deliverBtn = Button(
                    name:"Deliver Letter",
                    id: "delivery",
                    onClick: (e) => deliveryAction(),
                  );
