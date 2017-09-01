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
                                    "text": "Decoration",
                                    'weight': 'bolder',

                                }

                            ],
                            "selectAction": {
                                "type": "Action.OpenUrl",
                                "title": "cool link 1",
                                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "Action.OpenUrl",
                                    "title": "cool link 1",
                                    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                },
                            ]
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
                            ]
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
                            ]
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
                            ]
                        }
                    ]
                }
            ]
        }

    var blankCard = new BlankCard();
    //  blankCard.setBody(card);
    blankCard.setBody(card);
    var msg = new botBuilder.Message(session)
        .addAttachment(blankCard);
    session.send(msg);

}


