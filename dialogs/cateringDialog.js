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
                            "size": "large",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": pa + '/images/Catering/5.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + '/images/Catering/5.jpg'
                                        // "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSJP16ATQ/public/Aroma_Wedding_Caterer_UnoBridge_1475162978158.jpg"
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
                                    "url": pa + '/images/Catering/6.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + '/images/Catering/6.jpg'
                                        // "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSU4MUCWQ/public/Hungryyy_Caterer_UnoBridge_1475163096869.jpg"
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
                                    "url": pa + '/images/Catering/7.JPG',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + '/images/Catering/7.JPG'
                                        //  "url": "ttps://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBS23LVGUQ/public/New_Sagar_Caterer_UnoBridge_1475163023227.jpg"
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
                                    "url": pa + '/images/Catering/4.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSM0MQIUQ/public/Aahar_Utsav_Caterer_UnoBridge_1475163027979.jpg"
                                        //"url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSM0MQIUQ/public/Aahar_Utsav_Caterer_UnoBridge_1475163027979.jpg"
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

