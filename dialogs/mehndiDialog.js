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
                        // {
                        //     "type": "Column",
                        //     "size": "auto",
                        //     "items": [
                        //         {
                        //             "type": "Image",
                        //             "url": pa + '/images/mehndi/1.jpg',
                        //             "selectAction": {
                        //                 "type": "Action.OpenUrl",
                        //                 "title": "cool link",
                        //                 "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSXJXVL4R/public/Sandhya_Krishnan_Mehndi_UnoBridge_1475163903434.jpg"
                        //             }
                        //         },
                        //     ]
                        // },
                        {
                            "type": "Column",
                            "size": "auto",
                            "items": [

                                {
                                    "type": "Image",
                                    "url": pa + '/images/mehndi/2.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSXJXVL4R/public/Sandhya_Krishnan_Mehndi_UnoBridge_1475163903434.jpg"

                                        // "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSTRUZL4R/public/Sakina_Mehndi_Designs_UnoBridge_1475163904437.jpg"
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
                                    "url": pa + '/images/mehndi/3.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSTRUZL4R/public/Sakina_Mehndi_Designs_UnoBridge_1475163904437.jpg"

                                        // "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBS0OZMN4R/public/Ravi_Mehndi_Art_UnoBridge_1475163909872.jpg"
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
                                    "url": pa + '/images/mehndi/4.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBS0OZMN4R/public/Ravi_Mehndi_Art_UnoBridge_1475163909872.jpg"
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

