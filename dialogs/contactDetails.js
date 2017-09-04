var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function (session, args) {
    session.userData = session.userData || {};
    session.userData.contactInfo = args || {};
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
                                "text": "Thanks " + session.userData.contactInfo.name + " for the response. ",
                                "weight": 'bolder',
                                // 'size': "large"
                            },
                            {
                                "type": 'TextBlock',
                                "text": "We will contact you on this number ",
                                "weight": 'bolder',
                                // 'size': "large"
                            },
                            {
                                "type": 'TextBlock',
                                "text": session.userData.contactInfo.phone + " soon",
                                "weight": 'bolder',
                                // 'size': "large"
                            }
                        ]
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


