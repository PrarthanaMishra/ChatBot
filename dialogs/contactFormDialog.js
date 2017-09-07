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
                                "text": "Provide us your name and contact number,",
                                "weight": "bolder",
                                // "size": "large"
                            },
                            {
                                "type": "TextBlock",
                                "text": " we will reach you shortly",
                                "weight": "bolder",
                                // "size": "large"
                            },

                            {
                                "type": "TextBlock",
                                "text": "Your name",
                                "wrap": true
                            },
                            {
                                "type": "Input.Text",
                                "id": "name",
                                "placeholder": "Full name"
                            },

                            {
                                "type": "TextBlock",
                                "text": "Phone Number"

                            },
                            {
                                "type": "Input.Text",
                                "id": "phone",
                                "placeholder": "enter 10 digit mobile number",
                                "style": "tel"
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
                            "title": "submit",
                            "data": {
                                "type": 'submit'
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

