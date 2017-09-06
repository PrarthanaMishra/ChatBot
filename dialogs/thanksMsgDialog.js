var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function thanksMsg(session, args) {
    session.userData = session.userData || {};
    session.userData.contactInfo = session.userData.contactInfo || args;
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
                                "text": "Thanks for visiting our website!!!",
                                // "weight": "bolder",

                            },
                            {
                                "type": "TextBlock",
                                "text": "For more enquires/info, contact unobridge",
                                //"weight": "bolder",

                            },
                            {
                                "type": "TextBlock",
                                "text": " on 9108103333",
                                //"weight": "bolder",

                            },
                            {
                                "type": "TextBlock",
                                "text": "or mail us at sales@unobridge.com",
                                //"weight": "bolder",

                            },
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
                                'text': 'Go back',
                                'weight': 'bolder',
                                'style': 'Person',
                                'size': 'larger'

                            }

                        ],
                        "selectAction": {
                            "type": "Action.Submit",
                            "title": "goback",
                            "data": {
                                "type": 'goback'
                            }

                        }
                    },

                    {
                        "type": "Columns",
                        "size": "auto",
                        "items": [
                            {
                                "type": "TextBlock",
                                'text': 'UpdateContactDetails',
                                'weight': 'bolder',
                                'style': 'Person',
                                // 'size': 'larger'

                            }

                        ],
                        "selectAction": {
                            "type": "Action.Submit",
                            "title": "updatecontact",
                            "data": {
                                "type": 'updatecontact'
                            }

                        }
                    }
                ]
            }

        ]
    }


    if (!(session.userData && session.userData.contactInfo && session.userData.contactInfo.name && session.userData.contactInfo.phone)) {
        // delete card.items[1].columns[1];
        card.items[1].columns.splice(1, 1);
    }
    var blankCard = new BlankCard();
    blankCard.setBody(card);
    var msg = new botBuilder.Message(session)
        .addAttachment(blankCard);
    session.send(msg);
    session.endDialog();

}