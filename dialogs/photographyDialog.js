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
                                    "url": pa + '/images/Photography/1.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSAU3LRYQ/public/Bridal_Safari_UnoBridge_1475163148930.jpg"
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
                                    "url": pa + '/images/Photography/2.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSUMGXYYQ/public/MKB__Wedding_Photography_UnoBridge_1475163210212.jpg"
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
                                    "url": pa + '/images/Photography/3.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBS7JV3VZN/public/Chetan_Krishna_Photography_UnoBridge_1475161847415.jpg"
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
                                    "url": pa + '/images/Photography/4.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBS5PAJA3R/public/Vikash_Kumar_Photography_UnoBridge_1475163862437.jpg"
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

