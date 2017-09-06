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
                        //             "url": pa + '/images/Entertainment/1.jpg',
                        //             "selectAction": {
                        //                 "type": "Action.OpenUrl",
                        //                 "title": "cool link",
                        //                 "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBS4DSCS1R/public/DJ_Vicky_UnoBridge_1475163650266.jpg"
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
                                    "url": pa + '/images/Entertainment/2.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBS4DSCS1R/public/DJ_Vicky_UnoBridge_1475163650266.jpg"

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
                                    "url": pa + '/images/Entertainment/3.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBSS8FWS1R/public/DJ_Hassan_UnoBridge_1475163746351.jpg"

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
                                    "url": pa + '/images/Entertainment/4.jpg',
                                    "selectAction": {
                                        "type": "Action.OpenUrl",
                                        "title": "cool link",
                                        "url": "https://unobridge.s3-ap-southeast-1.amazonaws.com/services/UBS7O5SS1R/public/DJ_Rony_UnoBridge_1475163744894.jpg"

                                        //  "url": "https://www.unobridge.com/servicedetails/578f1c92501325661856c496"
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

