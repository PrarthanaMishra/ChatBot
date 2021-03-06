var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function contactFormDialog(session, args) {
    session.userData = session.userData || {};
    session.userData.contactInfo = args || {};
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
                                "text": "What else are you looking for?",
                                "weight": "bolder",
                                // "size": "large"
                            },
                            {
                                "type": "TextBlock",
                                "text": "Please mention the details",
                                "weight": "bolder",
                                // "size": "large"
                            },
                            {
                                "type": "TextBlock",
                                "text": "below",
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
                                "placeholder": session.userData.contactInfo.name
                            },

                            {
                                "type": "TextBlock",
                                "text": "Phone Number"
                            },
                            {
                                "type": "Input.Text",
                                "id": "phone",
                                "placeholder": session.userData.contactInfo.phone,
                                "style": "tel"
                            },
                            {
                                "type": "TextBlock",
                                "text": "Looking for",
                                "wrap": true
                            },
                            {
                                "type": "Input.Text",
                                "id": "lookingfor",
                                "placeholder": " ",
                                "isMultiline": true
                            },

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
                            "title": "submits",
                            "data": {
                                "type": 'submits'
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

