var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function thanksMsg(session) {
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
                                "weight": "bolder",

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
                                'text': 'GoBack',
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