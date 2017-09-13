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
                                    "text": "Car decoration",
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
                                    "type": 'birthday'
                                }

                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'Entire Wedding',
                                    // 'weight': 'bolder',
                                    'style': 'Person',
                                    'wrap': 'true'

                                }

                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "entireweddng",
                                "data": {
                                    "type": 'entirewedding'
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
                                    'style': 'Person',
                                    'wrap': true
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
                                    'text': 'Thread Ceremony',
                                    // 'weight': 'bolder',
                                    'style': 'Person',
                                    'wrap': true
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "threadceremony",
                                "data": {
                                    "type": 'threadceremony'
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
                                    'style': 'Person',
                                    'wrap': true
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
                },
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


