var botBuilder = require('botbuilder');
var BlankCard = require('../adaptiveCards/blankCard.js');


module.exports = function catering(session) {
    var pa = 'https://young-ridge-11917.herokuapp.com';
    var card =
        {
            'type': 'Container',
            'items': [

                {
                    "type": "Columnset",
                    "columns": [
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Some of the samples are shown below:-",
                                    "weight": "bolder"
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
                                    "url": pa + '/images/Catering/weddingMenu/1.JPG',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + '/images/Catering/weddingMenu/1.JPG'
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
                                    "url": pa + '/images/Catering/weddingMenu/2.JPG',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + '/images/Catering/weddingMenu/2.JPG'
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
                                    "url": pa + '/images/Catering/weddingMenu/3.JPG',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + '/images/Catering/weddingMenu/3.JPG'
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
                                    "url": pa + '/images/Catering/weddingMenu/4.JPG',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + '/images/Catering/weddingMenu/3.JPG'
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
                                    "url": pa + '/images/Catering/weddingMenu/5.JPG',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + '/images/Catering/weddingMenu/5.JPG'
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
                                    "url": pa + '/images/Catering/weddingMenu/6.JPG',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": pa + '/images/Catering/weddingMenu/6.JPG'
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

