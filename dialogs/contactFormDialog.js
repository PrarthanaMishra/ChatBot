var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function contactFormDialog(session, args) {
    session.userData = session.userData || {};
    session.userData.contactInfo = args || {};
    console.dir(args);
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
                                "placeholder": "Full name",
                                "value": session.userData.contactInfo.name

                            },

                            {
                                "type": "TextBlock",
                                "text": "Phone Number"

                            },
                            {
                                "type": "Input.Text",
                                "id": "phone",
                                "placeholder": "enter 10 digit mobile number",
                                "value": session.userData.contactInfo.phone,
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
    if (session && session.userData && session.userData.contactInfo.flag === "y") {
        card.items[0].columns[0].items[0].text = "Please fill both the fields";
        card.items[0].columns[0].items.splice(1, 1);
    }

    var blankCard = new BlankCard();
    blankCard.setBody(card);
    var msg = new botBuilder.Message(session)
        .addAttachment(blankCard);
    session.send(msg);
    session.endDialog();
}

