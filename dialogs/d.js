var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function (session) {
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
                                "text": "Number of packs",
                                "wrap": true,
                                "weight": "bolder"
                            },
                            {
                                "type": "Input.Text",
                                "id": "packs",
                                "placeholder": "Number of packs",
                                "weight": "bolder"
                            },

                            {
                                "type": "TextBlock",
                                "text": "Location",
                                "weight": "bolder"

                            },
                            {
                                "type": "Input.Text",
                                "id": "location",
                                "placeholder": "Enter your location",


                            },
                            {
                                "type": "TextBlock",
                                "text": "Budget",
                                "weight": "bolder"

                            },
                            {
                                "type": "Input.Text",
                                "id": "budget",
                                "placeholder": "Enter your budget"
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
                                "type": "TextBlock",
                                'text': 'Submit',
                                'weight': 'bolder',
                                'style': 'Person',

                            }

                        ],
                        "selectAction": {
                            "type": "Action.Submit",
                            "title": "cateringSubmit",
                            "data": {
                                "type": 'cateringSubmit'
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

