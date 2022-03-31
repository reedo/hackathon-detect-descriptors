import {ITreeNode} from "./models";

// export const data: ITreeNode[] = [
//     {
//         label: "one",
//         tags: ["1", "one", "uno"],
//         children: [
//             {
//                 label: "one-one",
//                 tags: ["something"],
//                 children: []
//             }
//         ]
//     },
//     {
//         label: "two",
//         tags: ["2", "dos"],
//         children: [
//             {
//                 label: "two-one",
//                 tags: ["something"],
//                 children: [{
//                     label: "two-two",
//                     tags: ["two"],
//                     children: []
//                 }]
//             }
//         ]
//     },
//     {
//         label: "three",
//         tags: ["3", "tres"],
//         children: [
//             {
//                 label: "bacon",
//                 tags: ["meat", "pork"],
//                 children: [{
//                     label: "smoked bacon",
//                     tags: ["smoky", "bacon", "smoked"],
//                     children: []
//                 }]
//             }
//         ]
//     }
// ];

export const data: ITreeNode[] = [
    {
        "label": "Environment",
        "tags": ["bird"],
        "children": [
            {
                "label": "Birds / Animals Hazards",
                "tags": ["bird"],
                "children": [
                    {
                        "label": "Bird Strike",
                        "tags": ["bird"]
                    }
                ]
            }
        ]
    },
    {
        "label": "Aircaft Systems and Technical",
        "tags": ["fire", "smoke", "oven", "locker", "seat", "person", "toilet", "headset", "microphone", "speaker", "music", "door", "battery", "electricity", "fuel pump", "oil barell", "rain", "storm cloud", "wipers", "wheel", "light", "lamp", "bulb", "map", "compass", "fan", "rotary blade"],
        "children": [
            {
                "label": "Powerplant",
                "tags": ["fire", "smoke", "fan", "rotary blade"],
                "children": [
                    {
                        "label": "Engine Fire Warning",
                        "tags": ["fire", "smoke"]
                    },
                    {
                        "label": "Fan Blades Damage",
                        "tags": ["fan", "rotary blade"]
                    },
                ]
            },
            {
                "label": "Cabin Equipment",
                "tags": ["oven", "fire", "smoke", "locker", "seat", "person", "toilet"],
                "children": [
                    {
                        "label": "Oven fault / Failure",
                        "tags": ["oven", "fire", "smoke"]
                    },
                    {
                        "label": "Overhead Locker Defective",
                        "tags": ["locker"]
                    },
                    {
                        "label": "Passenger Seat Fault / Failure",
                        "tags": ["seat", "person"]
                    },
                    {
                        "label": "Toilet System Fault / Failure",
                        "tags": ["toilet",]
                    },
                ]
            },
            {
                "label": "Communications Systems",
                "tags": ["headset", "microphone", "speaker", "music"],
                "children": [
                    {
                        "label": "Flight Crew Headsets Fault / Failure",
                        "tags": ["headset", "microphone"]
                    },
                    {
                        "label": "Flight Deck Loudspeakers fault / failure",
                        "tags": ["speaker", "music"]
                    },
                ]
            },
            {
                "label": "Doors Technical",
                "tags": ["door"],
                "children": [
                    {
                        "label": "Cabin Door Fault / Failure",
                        "tags": ["door"]
                    },
                ]
            },
            {
                "label": "Electrics",
                "tags": ["battery", "electricity"],
                "children": [
                    {
                        "label": "Battery Fault / Failure",
                        "tags": ["battery", "electricity"]
                    },
                ]
            },
            {
                "label": "Fuel Systems",
                "tags": ["fuel pump", "oil barrel"],
                "children": [
                    {
                        "label": "Fuel Pump Fault / Failure",
                        "tags": ["fuel pump", "oil barrel"]
                    },
                ]
            },
            {
                "label": "Ice / Rain Protection",
                "tags": ["rain", "storm cloud", "wipers"],
                "children": [
                    {
                        "label": "Windscreen wipers / rain repellent fault / failure",
                        "tags": ["rain", "storm cloud", "wipers"]
                    },
                ]
            },
            {
                "label": "Landing Gear and Wheels",
                "tags": ["wheel"],
                "children": [
                    {
                        "label": "Nose Wheel / Gear Vibration",
                        "tags": ["wheel"]
                    },
                ]
            },
            {
                "label": "Lights",
                "tags": ["light", "lamp", "bulb"],
                "children": [
                    {
                        "label": "External Lights Fault / Failure",
                        "tags": ["light", "lamp", "bulb"]
                    },
                ]
            },
            {
                "label": "Navigation equipment",
                "tags": ["map", "compass"],
                "children": [
                    {
                        "label": "Map Shift / Loss of Navigational Accuracy",
                        "tags": ["light", "lamp", "bulb"]
                    },
                ]
            },
        ]
    },
    {
        "label": "Catering",
        "tags": ["person puking", "sick"],
        "children": [
            {
                "label": "Catering Quality",
                "tags": ["person puking", "sick"],
                "children": [
                    {
                        "label": "Suspected Food Poisoning Onboard",
                        "tags": ["person puking", "sick"]
                    }
                ]
            }
        ]
    },
    {
        "label": "Passengers",
        "tags": ["mobile phone", "phone"],
        "children": [
            {
                "label": "Disruptive",
                "tags": ["mobile phone", "phone"],
                "children": [
                    {
                        "label": "Prohibited use of mobile phone / PED (personal electronic device)",
                        "tags": ["mobile phone", "phone"]
                    }
                ]
            }
        ]
    },
    {
        "label": "Security",
        "tags": ["bag", "suitcase"],
        "children": [
            {
                "label": "Baggage",
                "tags": ["bag", "suitcase"],
                "children": [
                    {
                        "label": "Baggage screening issues",
                        "tags": ["bag", "suitcase"]
                    }
                ]
            }
        ]
    },
]