import "button.dart";
import "actions.dart";
import "state.dart";

final deliverBtn = new Button(
                    name:"Deliver Letter",
                    id: "delivery",
                    element: "delivery-btn",
                    onClick: (e) => deliveryAction()
                  );

final nextPhaseBtn = new Button(
                    name: "Next Phase",
                    id:"next-phase",
                    element:"next-phase-at",
                    onClick: (e) {
                      print("HEREH");
                      print(state['choosePowerups']);
                      state['choosePowerups'] = true;    
                    } 
                  );
