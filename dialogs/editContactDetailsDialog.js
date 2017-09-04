var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function editContactDetailsDialog(session, args) {
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
                                "text": "Fill the form below. Our repres",
                                "weight": "bolder",
                                // "size": "large"
                            },
                            {
                                "type": "TextBlock",
                                "text": "sentators will reach you shortly",
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
                                'text': 'Update',
                                'weight': 'bolder',
                                'style': 'Person',

                            }

                        ],
                        "selectAction": {
                            "type": "Action.Submit",
                            "title": "update",
                            "data": {
                                "type": 'update'
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
                            "title": "updatecancel",
                            "data": {
                                "type": 'updatecancel'
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

