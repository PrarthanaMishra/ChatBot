var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function (session, args) {
    session.userData = session.userData || {};
    session.userData.contactInfo = args || {};
    session.userData.contactInfo.serviceChoosed = args.serviceChoosed || [];

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
                                "text": "Thanks " + session.userData.contactInfo.name + " for update! ",
                                //"weight": 'bolder',
                                // 'size': "large"
                            },
                            {
                                "type": 'TextBlock',
                                "text": "We will reach you shortly on this number ",
                                //"weight": 'bolder',
                                // 'size': "large"
                            },
                            {
                                "type": 'TextBlock',
                                "text": session.userData.contactInfo.phone,
                                //"weight": 'bolder',
                                // 'size': "large"
                            },

                            // {
                            //     "type": 'TextBlock',
                            //     "text": session.userData.contactInfo.serviceChoosed.join(', '),
                            //     //"weight": 'bolder',
                            //     // 'size': "large"
                            // },
                            // {
                            //     "type": 'TextBlock',
                            //     "text": "is the service you choosed.",
                            //     // "weight": 'bolder',
                            //     // 'size': "large"
                            // },

                        ]
                    }
                ]

            }
        ]
    }
    if (!(session.userData && session.userData.contactInfo.name && session.userData.contactInfo.phone)) {
        delete card.items[0].columns[0].items.splice(0, 3);
    }
    if (!(session.userData && session.userData.contactInfo && (session.userData.contactInfo.serviceChoosed.length > 0))) {
        delete card.items[0].columns[0].items.splice(4, 1);
    }
    var blankCard = new BlankCard();
    blankCard.setBody(card);
    var msg = new botBuilder.Message(session)
        .addAttachment(blankCard);
    session.send(msg);
    session.endDialog();

}


