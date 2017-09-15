var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function contactFormDialog(session) {
    var card = {
        'type': 'Container',
        'items': [
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "size": 2,
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": "When is the requirement?",
                                "weight": "bolder",
                                // "size": "large"
                            },
                            {
                                "type": "Input.Date",
                                "id": "date"
                                //"weight": "bolder"
                                // "size": "large"
                            },

                            {
                                "type": "TextBlock",
                                "text": "Location",
                                "weight": "bolder"

                            },
                            {
                                "type": "Input.Text",
                                "id": "location",
                                "placeholder": "Please  enter your location",


                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "size": 1,
                        "items": [
                            {
                                "type": "Image",
                                "url": "https://media.glassdoor.com/sqll/1099839/unobridge-squarelogo-1457093763168.png",
                                "size": "auto"
                            }
                        ]
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
                                "type": "Input.ChoiceSet",
                                "id": "venueType",
                                "isMultiSelect": true,
                                // "value": "1,3",
                                "style": "compact",
                                "choices": [
                                    {
                                        "title": "Banquet Hall",
                                        "value": "KBH",
                                        "isSelected": false
                                    },
                                    {
                                        "title": "Grand Party Hall",
                                        "value": "GPH",
                                        "isSelected": false
                                    },
                                    {
                                        "title": "kalyana Mantapa",
                                        "value": "KM",
                                        "isSelected": false
                                    }
                                ]
                            }
                        ]
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
                                'text': 'Submit',
                                'weight': 'bolder',
                                'style': 'Person',

                            }

                        ],
                        "selectAction": {
                            "type": "Action.Submit",
                            "title": "venuSubmit",
                            "data": {
                                "type": 'venuSubmit'
                            }

                        }
                    },
                    {
                        "type": "Columns",
                        "size": "auto",
                        "items": [
                            {
                                "type": "TextBlock",
                                'text': 'Cancel',
                                'weight': 'bolder',
                                'style': 'Person',

                            }

                        ],
                        "selectAction": {
                            "type": "Action.Submit",
                            "title": "cancel",
                            "data": {
                                "type": 'cancel'
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

