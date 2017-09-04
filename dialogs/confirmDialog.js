var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function (session, args) {
    session.userData = session.userData || {};
    session.userData.serviceButtons = args || {};
    var card = {
        "type": "Container",
        "items": [
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "size": "auto",
                        "items": [
                            {
                                "type": 'TextBlock',
                                "text": "Are you looking for " + session.userData.serviceButtons,
                                "weight": 'bolder',
                                // 'size': "large"
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
                                "type": 'TextBlock',
                                "text": "Yes",
                                "weight": 'bolder',

                            },
                        ],
                        "selectAction": {
                            "type": "Action.Submit",
                            "title": "Yes",
                            "data": {
                                "type": 'yes'
                            }
                        }
                    },
                    {
                        "type": "Column",
                        "size": "auto",
                        "items": [
                            {
                                "type": 'TextBlock',
                                "text": "No",
                                "weight": "bolder",

                            }

                        ],
                        "selectAction": {
                            "type": "Action.Submit",
                            "title": "no",
                            "data": {
                                "type": 'no'
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


