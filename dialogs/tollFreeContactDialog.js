
var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function (session) {
    var card =
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "size": 2,
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "If you have any queries, please feel free to ",
                            "weight": "bolder",
                            // "size": "large"
                        },
                        {
                            "type": "TextBlock",
                            "text": "contact on the following number 9731776008",
                            "weight": "bolder",
                            // "size": "large"
                        }
                        // {
                        //     "type": "TextBlock",
                        //     "text": "given following 9731776008",
                        //     "weight": "bolder",
                        //     // "size": "large"
                        // }
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