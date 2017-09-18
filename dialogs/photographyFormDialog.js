
module.exports = function decoration(session, args) {
    session.userData = session.userData || {};
    session.userData.clientInfo = args || {};
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
                                "text": "When is the event?",
                                "weight": "bolder",
                                // "size": "large"
                            },
                            {
                                "type": "Input.Date",
                                "id": "date",
                                "value": session.userData.clientInfo.date
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
                                "placeholder": "Enter your location",
                                "value": session.userData.clientInfo.location


                            },
                            {
                                "type": "TextBlock",
                                "text": "What type of photography",
                                "weight": "bolder"

                            },
                            {
                                "type": "TextBlock",
                                "text": "you are looking for?",
                                "weight": "bolder"

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
                                "id": "myColor3",
                                "isMultiSelect": true,
                                // "value": "1,3",
                                "style": "compact",
                                "choices": [
                                    {
                                        "title": "Candid",
                                        "value": "Candid",
                                        "isSelected": false
                                    },
                                    {
                                        "title": "Traditional",
                                        "value": "Traditional",
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
                            "title": "photoSubmit",
                            "data": {
                                "type": 'photosubmit'
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
    var botBuilder = require('botbuilder');
    var BlankCard = require('../adaptiveCards/blankCard.js');
    var blankCard = new BlankCard();
    blankCard.setBody(card);
    var msg = new botBuilder.Message(session)
        .addAttachment(blankCard);
    session.send(msg);
    session.endDialog();
}

