var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');


module.exports = function catering(session) {
    var pa = 'https://young-ridge-11917.herokuapp.com';
    var card =
        {
            'type': 'Container',
            'items': [

                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + '/images/Catering/1.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                    }
                                },
                                {
                                    "type": "TextBlock",
                                    'text': 'hello',
                                    'weight': 'bolder',
                                    'style': 'Person'
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [

                                {
                                    "type": "Image",
                                    "url": pa + '/images/Catering/2.jpg'
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + '/images/Catering/3.jpg'
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    var blankCard = new BlankCard();
    //  blankCard.setBody(card);
    blankCard.setBody(card);
    var msg = new botBuilder.Message(session)
        .addAttachment(blankCard);
    session.send(msg);

}

