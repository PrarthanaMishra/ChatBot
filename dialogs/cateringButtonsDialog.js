var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function catering(session) {
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
                                    "text": "Wedding Menu",
                                    //'weight': 'bolder',

                                }

                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "weddingmenu",
                                "data": {
                                    "type": 'weddingmenu'
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
                                    // 'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "naming ceremony",
                                "data": {
                                    "type": 'namingceremony'
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

                                }

                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "birthday",
                                "data": {
                                    "type": 'birthday'
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
                                    'text': 'Engagement',
                                    // 'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "engagement",
                                "data": {
                                    "type": 'engagement'
                                }

                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'Baby Shower',
                                    //  'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "babyshower",
                                "data": {
                                    "type": 'babyshower'
                                }

                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'House warming',
                                    // 'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "housewarming",
                                "data": {
                                    "type": 'housewarming'
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
                                    'text': 'Others',
                                    // 'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "others",
                                "data": {
                                    "type": 'others'
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


