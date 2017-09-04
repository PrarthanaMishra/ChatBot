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
                                    "url": pa + '/images/Venue booking/1.JPG',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://www.unobridge.com/servicedetails/578f1c92501325661856c496"
                                    }
                                },
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [

                                {
                                    "type": "Image",
                                    "url": pa + '/images/Venue booking/2.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://www.unobridge.com/servicedetails/578f1c92501325661856c496"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + '/images/Venue booking/3.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://www.unobridge.com/servicedetails/578f1c92501325661856c496"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + '/images/Venue booking/4.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://www.unobridge.com/servicedetails/578f1c92501325661856c496"
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

