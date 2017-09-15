var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function catering(session) {
    var pa = 'https://young-ridge-11917.herokuapp.com';
    var card =
        {
            'type': 'Container',
            'items': [
                {
                    "type": "ColumnSet",
                    "columns": [

                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [

                                {
                                    "type": "TextBlock",
                                    "text": "These are the decorations we offer:-",
                                    //'weight': 'bolder',
                                    'wrap': true

                                }

                            ],
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [

                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [

                                {
                                    "type": "TextBlock",
                                    "text": "Car Decoration",
                                    //'weight': 'bolder',
                                    'wrap': true

                                }

                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "cardecoration",
                                "data": {
                                    "type": 'cardecoration'
                                }
                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [

                                {
                                    "type": "TextBlock",
                                    'text': 'Birthday',
                                    // 'weight': 'bolder',
                                    'style': 'Person',
                                    'wrap': true
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "birthday",
                                "data": {
                                    "type": 'decobirthday'
                                }

                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'Name Board',
                                    // 'weight': 'bolder',
                                    'style': 'Person',
                                    'wrap': true

                                }

                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "nameboard",
                                "data": {
                                    "type": 'nameboard'
                                }

                            }
                        }

                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'Manatapa Decoration',
                                    // 'weight': 'bolder',
                                    'style': 'Person',
                                    'wrap': true
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "mantap",
                                "data": {
                                    "type": 'mantap'
                                }

                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'Naming ceremony',
                                    //  'weight': 'bolder',
                                    'style': 'Person',
                                    'wrap': true
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "namingceremony",
                                "data": {
                                    "type": 'deconamingceremony'
                                }

                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'Stage Decoration',
                                    // 'weight': 'bolder',
                                    'style': 'Person',
                                    'wrap': true
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "stagedecoration",
                                "data": {
                                    "type": 'stagedecoration'
                                }

                            }
                        }
                    ]
                }
                // {
                //     "type": "ColumnSet",
                //     "columns": [
                //         {
                //             "type": "Column",
                //             "size": "auto",
                //             "items": [
                //                 {
                //                     "type": "TextBlock",
                //                     'text': 'Others',
                //                     // 'weight': 'bolder',
                //                     'style': 'Person',
                //                     'wrap': true
                //                 }
                //             ],
                //             "selectAction": {
                //                 "type": "Action.Submit",
                //                 "title": "others",
                //                 "data": {
                //                     "type": 'others'
                //                 }

                //             }
                //         }
                //     ]
                //  },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Columns",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'Go back',
                                    'weight': 'bolder',
                                    'style': 'Person',
                                    'size': 'larger'

                                }

                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "goback",
                                "data": {
                                    "type": 'goback'
                                }

                            }
                        }
                    ]
                }

            ]
        }

    var blankCard = new BlankCard();
    blankCard.setBody(card);
    var msg = new botBuilder.Message(session)
        .addAttachment(blankCard);
    session.send(msg);
    session.endDialog();

}


