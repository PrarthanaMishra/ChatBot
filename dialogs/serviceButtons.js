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
                                    "text": "These are the services we provide!!!!",
                                    'weight': 'bolder',

                                }
                            ]
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
                                    "text": "Decoration",
                                    'weight': 'bolder',

                                }

                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "Decoration",
                                "data": {
                                    "type": 'decoration'
                                }
                            }

                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [

                                {
                                    "type": "TextBlock",
                                    'text': 'Photography',
                                    'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "photography",
                                "data": {
                                    "type": 'photography'
                                }

                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'Catering',
                                    'weight': 'bolder',
                                    'style': 'Person',

                                }

                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "catering",
                                "data": {
                                    "type": 'catering'
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
                                    'text': 'Venue',
                                    'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "venue",
                                "data": {
                                    "type": 'venue'
                                }

                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'Mehandi',
                                    'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "mehandi",
                                "data": {
                                    "type": 'mehandi'
                                }

                            }
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    'text': 'MakeUpArtist',
                                    'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "title": "makeup",
                                "data": {
                                    "type": 'makeup'
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


