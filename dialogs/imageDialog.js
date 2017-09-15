var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');

module.exports = function (session, data) {
    var arrayOfImage = Array.isArray(data.arrayOfImage) ? data.arrayOfImage : [data.arrayOfImage];
    var pa = 'https://bot.eventgeni.com';
    var card =
        {
            'type': 'Container',
            'items': [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "size": "large",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": data.heading,
                                    "weight": "Strong"
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
                            "size": "large",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + arrayOfImage[0],
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + arrayOfImage[0]
                                    }
                                },
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "large",
                            "items": [

                                {
                                    "type": "Image",
                                    "url": pa + arrayOfImage[1],
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + arrayOfImage[1]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "large",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + arrayOfImage[2],
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + arrayOfImage[2]
                                    }
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

